// --- RUTAS DE HISTORIAL Y CALENDARIO POR ESTUDIANTE ---
app.get('/api/historial/estudiante/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { mes, año } = req.query; // Formato mes: '1-12', año: '2026'
    
    // Consulta para traer los registros de asistencia del estudiante en un mes específico
    const query = `
      To be sure, let's fetch attendance records
      SELECT TO_CHAR(fecha, 'YYYY-MM-DD') as fecha, estado, motivo_excusa 
      FROM asistencia 
      WHERE estudiante_id = $1 
      AND EXTRACT(MONTH FROM fecha) = $2 
      AND EXTRACT(YEAR FROM fecha) = $3
    `;
    // Nota: asegúrate de ajustar los nombres de columnas según tu esquema real de base de datos
    const result = await pool.query(query, [id, mes, año]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el historial del estudiante' });
  }
});

// --- RUTAS DE CONFIGURACIÓN ---
app.get('/api/configuracion', async (req, res) => {
  try {
    const secciones = await pool.query('SELECT * FROM secciones ORDER BY nombre');
    const docente = await pool.query('SELECT * FROM configuracion_docente LIMIT 1');
    res.json({
      secciones: secciones.rows,
      docente: docente.rows[0] || { nombre: 'Wanda Pujols', centro: 'Centro Educativo' }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al cargar la configuración' });
  }
});

app.post('/api/configuracion/secciones', async (req, res) => {
  try {
    const { nombre } = req.body;
    await pool.query('INSERT INTO secciones (nombre) VALUES ($1)', [nombre]);
    res.json({ success: true, message: 'Sección agregada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar la sección' });
  }
});
