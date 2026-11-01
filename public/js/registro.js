// Registro diario conectado a la base de datos.
(function () {
  const B = 'btn-status flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded-md font-label-md text-label-md ';
  const OFF = B + 'text-on-surface-variant hover:text-on-surface transition-all';
  const ON = {
    present: B + 'transition-all bg-secondary text-on-secondary shadow-xs',
    late: B + 'transition-all bg-tertiary-fixed text-on-tertiary-fixed font-bold shadow-xs',
    absent: B + 'transition-all bg-error text-on-error font-bold shadow-xs'
  };
  const CODE = { present: 'P', late: 'T', absent: 'A' };
  const NAME = { P: 'present', T: 'late', A: 'absent', E: 'excused' };
  const BADGE = {
    present: ['bg-surface-container text-outline', 'done', 'Presente'],
    late: ['bg-tertiary-fixed/50 text-tertiary-container font-semibold', 'schedule', 'Tardanza'],
    absent: ['bg-error-container text-on-error-container font-semibold', 'close', 'Ausente'],
    excused: ['bg-primary-fixed text-on-primary-fixed font-semibold', 'event_available', 'Excusa justificada'],
    none: ['bg-surface-container text-outline', 'remove', 'Sin registrar']
  };
  const d = new Date();
  const date = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const sel = document.querySelector('select[aria-label="Seleccionar Grado y Sección"]');
  const tbody = document.getElementById('student-rows-container');
  if (!sel || !tbody) return;

  const badge = k => { const b = BADGE[k]; return '<span class="status-badge inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-sm text-label-sm ' + b[0] + '"><span class="material-symbols-outlined text-[13px]">' + b[1] + '</span> ' + b[2] + '</span>'; };
  const btn = (st, t, ic, l) => '<button class="' + (st === t ? ON[t] : OFF) + '" onclick="setAttendance(this,\'' + t + '\')" type="button"><span class="material-symbols-outlined text-[16px]">' + ic + '</span><span>' + l + '</span></button>';
  function row(s, i) {
    const st = NAME[s.status] || 'none';
    const ini = esc(s.name.split(/[\s,]+/).filter(Boolean).slice(0, 2).map(x => x[0]).join('').toUpperCase());
    return '<tr class="student-row hover:bg-surface-container-low/50 transition-colors" data-id="' + s.student_id + '" data-status="' + st + '">' +
      '<td class="py-3.5 px-space-md font-body-sm text-body-sm text-outline text-center">' + String(i + 1).padStart(2, '0') + '</td>' +
      '<td class="py-3.5 px-space-md"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-md shrink-0">' + ini + '</div>' +
      '<div class="flex flex-col min-w-0"><span class="student-name font-title-md text-body-sm text-on-surface truncate">' + esc(s.name) + '</span><span class="student-id font-body-sm text-label-sm text-outline">Matrícula ' + s.student_id + '</span></div></div></td>' +
      '<td class="py-3.5 px-space-md"><div class="flex items-center justify-center p-1 bg-surface-container-low rounded-lg gap-1 max-w-[260px] mx-auto">' +
      btn(st, 'present', 'check', 'P') + btn(st, 'late', 'schedule', 'T') + btn(st, 'absent', 'close', 'A') + '</div></td>' +
      '<td class="py-3.5 px-space-md text-body-sm text-outline">' + (st === 'excused' ? 'Excusa registrada' : '') + '</td>' +
      '<td class="py-3.5 px-space-md text-right">' + badge(st) + '</td></tr>';
  }

  window.recalcMetrics = function () {
    const rs = [...document.querySelectorAll('.student-row')], n = rs.length;
    const c = k => rs.filter(r => r.dataset.status === k).length;
    const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    const pct = k => (n ? (c(k) / n * 100).toFixed(1) : '0.0') + '%';
    set('metric-total', n);
    set('metric-present', c('present')); set('metric-present-pct', pct('present') + ' en aula');
    set('metric-late', c('late')); set('metric-late-pct', pct('late') + ' con retraso');
    set('metric-absent', c('absent')); set('metric-absent-pct', pct('absent') + ' inasistencias');
  };
  window.setAttendance = function (b, t) {
    const r = b.closest('tr'); if (!r) return;
    r.querySelectorAll('.btn-status').forEach(x => { x.className = OFF; });
    b.className = ON[t]; r.dataset.status = t;
    const old = r.querySelector('.status-badge'); if (old) old.outerHTML = badge(t);
    window.recalcMetrics();
  };

  async function load() {
    if (!sel.value) { tbody.innerHTML = '<tr><td colspan="5" class="p-8 text-center text-outline">Aún no hay secciones. Crea tu primer estudiante en "Nuevo Estudiante".</td></tr>'; window.recalcMetrics(); return; }
    try {
      const rows = await api('/api/attendance?section=' + sel.value + '&date=' + date);
      tbody.innerHTML = rows.length ? rows.map(row).join('') : '<tr><td colspan="5" class="p-8 text-center text-outline">Esta sección no tiene estudiantes todavía.</td></tr>';
      window.recalcMetrics();
    } catch (e) { notify(e.message, false); }
  }
  async function save(final) {
    const records = [...document.querySelectorAll('.student-row')].filter(r => CODE[r.dataset.status]).map(r => ({ student_id: +r.dataset.id, status: CODE[r.dataset.status] }));
    if (!records.length) return notify('Marca al menos un estudiante antes de guardar', false);
    try { await api('/api/attendance', { method: 'PUT', body: { date, records } }); notify(final ? 'Asistencia finalizada y guardada' : 'Borrador guardado'); }
    catch (e) { notify(e.message, false); }
  }
  function rebind(id, fn) { const b = document.getElementById(id); if (b) { const n = b.cloneNode(true); b.replaceWith(n); n.addEventListener('click', fn); } }
  rebind('btn-quick-save', () => save(false));
  rebind('btn-finalizar-asistencia', () => save(true));
  rebind('btn-reset-attendance', () => load());

  api('/api/sections').then(list => {
    sel.innerHTML = list.map(s => '<option value="' + s.id + '">' + esc(s.name) + '</option>').join('');
    sel.addEventListener('change', load);
    load();
  }).catch(() => {});
})();
