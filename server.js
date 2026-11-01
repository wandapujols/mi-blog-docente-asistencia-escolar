const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(cookieParser());

const SECRET = process.env.JWT_SECRET || 'dev-secret-cambiar';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
const q = (text, params) => pool.query(text, params).then(r => r.rows);
const h = fn => (req, res) => fn(req, res).catch(e => { console.error(e); res.status(500).json({ error: 'Error del servidor' }); });
const STATUS = ['P', 'A', 'T', 'E'];
const isDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s || '');

// ---------- Autenticación ----------
app.post('/api/login', h(async (req, res) => {
  const { email, password } = req.body || {};
  const [u] = await q('SELECT * FROM app_users WHERE lower(email)=lower($1)', [email || '']);
  if (!u || !bcrypt.compareSync(password || '', u.pass_hash)) return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
  const token = jwt.sign({ id: u.id, name: u.name, email: u.email, role: u.role }, SECRET, { expiresIn: '12h' });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 12 * 3600 * 1000 });
  res.json({ name: u.name, role: u.role });
}));
app.post('/api/logout', (req, res) => { res.clearCookie('token'); res.json({ ok: true }); });

app.use('/api', (req, res, next) => {
  try { req.user = jwt.verify(req.cookies.token, SECRET); next(); }
  catch (e) { res.status(401).json({ error: 'Sesión no válida' }); }
});
app.get('/api/me', (req, res) => res.json(req.user));

// ---------- Secciones y estudiantes ----------
app.get('/api/sections', h(async (req, res) => res.json(await q('SELECT id, name FROM sections ORDER BY name'))));
app.post('/api/sections', h(async (req, res) => {
  const name = (req.body.name || '').trim();
  if (!name) return res.status(400).json({ error: 'Falta el nombre de la sección' });
  const [s] = await q('INSERT INTO sections(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id,name', [name]);
  res.json(s);
}));

app.get('/api/students', h(async (req, res) => {
  const sec = req.query.section ? Number(req.query.section) : null;
  res.json(await q(`SELECT st.id, st.name, st.guardian_phone, st.section_id, s.name AS section
    FROM students st JOIN sections s ON s.id=st.section_id
    WHERE st.active AND ($1::int IS NULL OR st.section_id=$1) ORDER BY st.name`, [sec]));
}));
app.post('/api/students', h(async (req, res) => {
  const { name, section_id, guardian_phone } = req.body;
  if (!name || !section_id) return res.status(400).json({ error: 'Faltan nombre o sección' });
  const [s] = await q('INSERT INTO students(name,section_id,guardian_phone) VALUES($1,$2,$3) RETURNING *', [name.trim(), section_id, guardian_phone || null]);
  res.json(s);
}));
app.put('/api/students/:id', h(async (req, res) => {
  const { name, section_id, guardian_phone } = req.body;
  const [s] = await q('UPDATE students SET name=COALESCE($1,name), section_id=COALESCE($2,section_id), guardian_phone=COALESCE($3,guardian_phone) WHERE id=$4 RETURNING *', [name, section_id, guardian_phone, req.params.id]);
  res.json(s || {});
}));
app.delete('/api/students/:id', h(async (req, res) => {
  await q('UPDATE students SET active=false WHERE id=$1', [req.params.id]);
  res.json({ ok: true });
}));

// ---------- Asistencia ----------
app.get('/api/attendance', h(async (req, res) => {
  const { section, date } = req.query;
  if (!isDate(date)) return res.status(400).json({ error: 'Fecha inválida' });
  res.json(await q(`SELECT st.id AS student_id, st.name, a.status
    FROM students st LEFT JOIN attendance a ON a.student_id=st.id AND a.day=$2
    WHERE st.active AND st.section_id=$1 ORDER BY st.name`, [section, date]));
}));
app.put('/api/attendance', h(async (req, res) => {
  const { date, records } = req.body;
  if (!isDate(date) || !Array.isArray(records)) return res.status(400).json({ error: 'Datos inválidos' });
  for (const r of records) {
    if (r.status === null || r.status === '') await q('DELETE FROM attendance WHERE student_id=$1 AND day=$2', [r.student_id, date]);
    else if (STATUS.includes(r.status)) await q(`INSERT INTO attendance(student_id,day,status) VALUES($1,$2,$3)
      ON CONFLICT(student_id,day) DO UPDATE SET status=EXCLUDED.status`, [r.student_id, date, r.status]);
  }
  res.json({ ok: true });
}));
app.get('/api/students/:id/attendance', h(async (req, res) =>
  res.json(await q("SELECT to_char(day,'YYYY-MM-DD') AS day, status FROM attendance WHERE student_id=$1 ORDER BY day", [req.params.id]))));

// ---------- Resumen y reportes ----------
app.get('/api/dashboard', h(async (req, res) => {
  const date = isDate(req.query.date) ? req.query.date : new Date().toISOString().slice(0, 10);
  const sections = await q(`SELECT s.id, s.name, count(DISTINCT st.id)::int AS total,
      count(a.status) FILTER (WHERE a.status='P')::int AS p, count(a.status) FILTER (WHERE a.status='A')::int AS a,
      count(a.status) FILTER (WHERE a.status='T')::int AS t, count(a.status) FILTER (WHERE a.status='E')::int AS e
    FROM sections s LEFT JOIN students st ON st.section_id=s.id AND st.active
    LEFT JOIN attendance a ON a.student_id=st.id AND a.day=$1 GROUP BY s.id ORDER BY s.name`, [date]);
  res.json({ date, sections });
}));
app.get('/api/reports/section/:id', h(async (req, res) =>
  res.json(await q(`SELECT st.id, st.name,
      count(a.status) FILTER (WHERE a.status='P')::int AS p, count(a.status) FILTER (WHERE a.status='A')::int AS a,
      count(a.status) FILTER (WHERE a.status='T')::int AS t, count(a.status) FILTER (WHERE a.status='E')::int AS e,
      count(a.status)::int AS n
    FROM students st LEFT JOIN attendance a ON a.student_id=st.id
    WHERE st.active AND st.section_id=$1 GROUP BY st.id ORDER BY st.name`, [req.params.id]))));

// ---------- Excusas ----------
app.get('/api/excuses', h(async (req, res) => res.json(await q(`SELECT e.id, st.name AS student,
  to_char(e.date_from,'YYYY-MM-DD') AS date_from, to_char(e.date_to,'YYYY-MM-DD') AS date_to, e.motive, e.has_doc, e.notes
  FROM excuses e JOIN students st ON st.id=e.student_id ORDER BY e.id DESC LIMIT 50`))));
app.post('/api/excuses', h(async (req, res) => {
  const { student_id, date_from, date_to, motive, has_doc, notes } = req.body;
  if (!student_id || !isDate(date_from) || !isDate(date_to) || date_to < date_from || !motive)
    return res.status(400).json({ error: 'Revisa estudiante, fechas y motivo' });
  const days = (Date.parse(date_to) - Date.parse(date_from)) / 864e5;
  if (days > 60) return res.status(400).json({ error: 'El rango máximo es de 60 días' });
  await q('INSERT INTO excuses(student_id,date_from,date_to,motive,has_doc,notes) VALUES($1,$2,$3,$4,$5,$6)', [student_id, date_from, date_to, motive, !!has_doc, notes || null]);
  for (let t = Date.parse(date_from); t <= Date.parse(date_to); t += 864e5) {
    const d = new Date(t), w = d.getUTCDay();
    if (w === 0 || w === 6) continue;
    await q(`INSERT INTO attendance(student_id,day,status) VALUES($1,$2,'E') ON CONFLICT(student_id,day) DO UPDATE SET status='E'`, [student_id, d.toISOString().slice(0, 10)]);
  }
  res.json({ ok: true });
}));

app.use(express.static(path.join(__dirname, 'public')));

// ---------- Base de datos: se crea sola al iniciar ----------
async function init() {
  // Si quedaron tablas de un intento anterior con otro esquema, y están vacías, se recrean.
  const cols = await q("SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='students'");
  if (cols.length && !cols.some(c => c.column_name === 'section_id')) {
    for (const t of ['students', 'attendance', 'excuses', 'sections']) {
      const r = await q('SELECT count(*)::int AS n FROM ' + t).catch(() => [{ n: 0 }]);
      if (r[0].n > 0) throw new Error('La tabla ' + t + ' tiene datos de un esquema anterior; no se modificó nada.');
    }
    await pool.query('DROP TABLE IF EXISTS excuses, attendance, students, sections CASCADE');
    console.log('Tablas antiguas vacías recreadas con el esquema nuevo.');
  }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_users(id SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'docente', pass_hash TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sections(id SERIAL PRIMARY KEY, name TEXT UNIQUE NOT NULL);
    CREATE TABLE IF NOT EXISTS students(id SERIAL PRIMARY KEY, name TEXT NOT NULL, section_id INT NOT NULL REFERENCES sections(id), guardian_phone TEXT, active BOOLEAN NOT NULL DEFAULT true);
    CREATE TABLE IF NOT EXISTS attendance(student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE, day DATE NOT NULL, status CHAR(1) NOT NULL CHECK (status IN ('P','A','T','E')), PRIMARY KEY(student_id, day));
    CREATE TABLE IF NOT EXISTS excuses(id SERIAL PRIMARY KEY, student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE, date_from DATE NOT NULL, date_to DATE NOT NULL, motive TEXT NOT NULL, has_doc BOOLEAN NOT NULL DEFAULT false, notes TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
  `);
  const [{ n }] = await q('SELECT count(*)::int AS n FROM app_users');
  if (n === 0) {
    const email = process.env.ADMIN_EMAIL || 'admin@eduasiste.do';
    const pass = process.env.ADMIN_PASSWORD;
    if (!pass) { console.warn('Falta ADMIN_PASSWORD: no se creó el usuario inicial.'); }
    else await q('INSERT INTO app_users(email,name,role,pass_hash) VALUES($1,$2,$3,$4)', [email, process.env.ADMIN_NAME || 'Docente Administrador', 'admin', bcrypt.hashSync(pass, 10)]);
  }
}
const PORT = process.env.PORT || 3000;
init().then(() => app.listen(PORT, () => console.log('Servidor activo en el puerto ' + PORT)))
  .catch(e => { console.error('No se pudo iniciar la base de datos:', e.message); process.exit(1); });
