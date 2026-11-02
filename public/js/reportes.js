// Reportes y estadísticas con datos reales.
(function () {
  const S = [...document.querySelectorAll('section')];
  if (S.length < 4) return;
  const charts = S[2].nextElementSibling;
  const DOW = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const col = p => p > 20 ? 'error' : p > 10 ? 'tertiary' : 'secondary';
  const box = (title, sub, inner) => '<div class="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg"><h3 class="font-headline-md text-headline-md text-on-surface">' + title + '</h3><p class="font-body-sm text-body-sm text-on-surface-variant mb-space-md">' + sub + '</p>' + inner + '</div>';
  const kpi = (label, value, sub, c) => '<div class="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col"><span class="font-label-md text-label-md text-outline uppercase tracking-wider">' + label + '</span><span class="font-display-lg text-display-lg text-' + c + ' mt-space-xs">' + value + '</span><span class="font-body-sm text-body-sm text-on-surface-variant mt-1">' + sub + '</span></div>';
  const pc = (x, n) => n ? x / n * 100 : 0;

  // Los botones de exportar del diseño no tenían función: se reemplazan por Imprimir y CSV.
  document.querySelectorAll('button').forEach(b => { if (/PDF|Excel|Exportar|Descargar/i.test(b.textContent)) b.remove(); });

  let current = [];
  function draw(d) {
    const st = d.students; current = st;
    const n = st.reduce((a, s) => a + s.n, 0), ab = st.reduce((a, s) => a + s.a, 0), tt = st.reduce((a, s) => a + s.t, 0), ee = st.reduce((a, s) => a + s.e, 0);
    const risk = st.filter(s => s.n > 0 && pc(s.a, s.n) > 20);
    S[2].innerHTML = kpi('Asistencia', n ? (100 - pc(ab, n)).toFixed(1) + '%' : 'Sin datos', ab + ' ausencias en ' + n + ' registros', n ? col(pc(ab, n)) : 'outline') +
      kpi('Estudiantes en riesgo', risk.length, 'Más del 20% de inasistencia', risk.length ? 'error' : 'secondary') +
      kpi('Índice de puntualidad', n ? (100 - pc(tt, n)).toFixed(1) + '%' : 'Sin datos', tt + ' tardanzas', 'tertiary') +
      kpi('Excusas', ee, 'Días justificados', 'primary');

    const top = st.filter(s => s.n > 0).map(s => ({ s, p: pc(s.a, s.n) })).sort((a, b) => b.p - a.p).slice(0, 8);
    const rank = top.length ? top.map(o => '<div class="mb-space-sm"><div class="flex justify-between font-label-md text-label-md"><span class="truncate pr-2">' + esc(o.s.name) + '</span><span class="text-' + col(o.p) + ' font-bold">' + o.p.toFixed(1) + '%</span></div><div class="h-2 bg-surface-container rounded-full overflow-hidden mt-1"><div class="h-full bg-' + col(o.p) + ' rounded-full" style="width:' + Math.min(100, o.p * 3) + '%"></div></div></div>').join('') : '<p class="text-outline">Aún no hay asistencia registrada.</p>';
    const wd = [1, 2, 3, 4, 5].map(k => { const r = d.weekday.find(x => x.dow === k) || { a: 0, n: 0 }; return { l: DOW[k], p: pc(r.a, r.n) }; });
    const mx = Math.max(10, ...wd.map(x => x.p));
    const week = '<div class="flex items-end justify-around gap-2 h-40">' + wd.map(x => '<div class="flex flex-col items-center justify-end h-full flex-1"><span class="font-label-sm text-label-sm text-outline mb-1">' + x.p.toFixed(1) + '%</span><div class="w-8 bg-' + col(x.p) + ' rounded-t-sm" style="height:' + Math.max(2, x.p / mx * 100) + '%"></div></div>').join('') + '</div><div class="flex justify-around mt-2 font-label-sm text-label-sm text-outline">' + wd.map(x => '<span class="flex-1 text-center">' + x.l + '</span>').join('') + '</div>';
    const wk = d.weeks.length ? '<div class="flex items-end justify-around gap-1 h-40">' + d.weeks.map(w => { const p = 100 - pc(w.a, w.n); return '<div class="flex flex-col items-center justify-end h-full flex-1" title="Semana del ' + w.wk + '"><span class="font-label-sm text-label-sm text-outline mb-1">' + p.toFixed(0) + '%</span><div class="w-5 bg-secondary rounded-t-sm" style="height:' + Math.max(2, p) + '%"></div></div>'; }).join('') + '</div><div class="flex justify-around mt-2 font-label-sm text-label-sm text-outline">' + d.weeks.map(w => '<span class="flex-1 text-center">' + w.wk.slice(5) + '</span>').join('') + '</div>' : '<p class="text-outline">Sin semanas registradas.</p>';
    charts.className = 'grid grid-cols-1 lg:grid-cols-3 gap-space-md mb-space-lg';
    charts.innerHTML = box('Ranking de inasistencia', 'Los 8 estudiantes con más ausencias', rank) + box('Patrón semanal', 'Ausentismo por día de la semana', week) + box('Evolución semanal', 'Asistencia por semana (fecha de inicio)', wk);

    const rows = st.map(s => ({ s, p: pc(s.a, s.n) })).sort((a, b) => b.p - a.p).map((o, i) => '<tr><td class="py-3 px-space-md">' + (i + 1) + '</td><td class="py-3 px-space-md font-semibold">' + esc(o.s.name) + '</td><td class="py-3 px-space-md">' + esc(o.s.section) + '</td><td class="py-3 px-space-md text-center">' + o.s.p + '</td><td class="py-3 px-space-md text-center">' + o.s.a + '</td><td class="py-3 px-space-md text-center">' + o.s.t + '</td><td class="py-3 px-space-md text-center">' + o.s.e + '</td><td class="py-3 px-space-md text-center"><span class="font-bold text-' + (o.s.n ? col(o.p) : 'outline') + '">' + (o.s.n ? o.p.toFixed(1) + '%' : '—') + '</span></td><td class="py-3 px-space-md">' + (o.s.n && o.p > 20 ? '<span class="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm font-semibold">En riesgo</span>' : '') + '</td></tr>').join('');
    S[3].innerHTML = '<div class="p-space-lg"><h3 class="font-headline-md text-headline-md text-on-surface">Resumen por estudiante</h3><p class="font-body-sm text-body-sm text-on-surface-variant">Ordenado de mayor a menor inasistencia. P presente, A ausente, T tardanza, E excusa.</p></div><div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider"><th class="py-3 px-space-md">#</th><th class="py-3 px-space-md">Estudiante</th><th class="py-3 px-space-md">Sección</th><th class="py-3 px-space-md text-center">P</th><th class="py-3 px-space-md text-center">A</th><th class="py-3 px-space-md text-center">T</th><th class="py-3 px-space-md text-center">E</th><th class="py-3 px-space-md text-center">% inasist.</th><th class="py-3 px-space-md">Estado</th></tr></thead><tbody class="divide-y divide-surface-container font-body-md text-body-md text-on-surface">' + (rows || '<tr><td colspan="9" class="p-8 text-center text-outline">No hay estudiantes en esta selección.</td></tr>') + '</tbody></table></div>';
  }

  function load(sec) { api('/api/reports/overview' + (sec ? '?section=' + sec : '')).then(draw).catch(e => notify(e.message, false)); }

  api('/api/sections').then(list => {
    S[1].innerHTML = '<div class="flex flex-wrap items-end gap-space-md"><div class="flex flex-col"><label class="font-label-md text-label-md text-outline uppercase tracking-wider" for="rsec">Sección</label><select id="rsec" class="bg-surface-container-low rounded-lg px-3 py-2 font-label-md text-label-md text-on-surface"><option value="">Todas las secciones</option>' + list.map(s => '<option value="' + s.id + '">' + esc(s.name) + '</option>').join('') + '</select></div><button id="rprint" type="button" class="px-4 py-2 rounded-lg bg-surface-container-low text-on-surface font-label-md">Imprimir informe</button><button id="rcsv" type="button" class="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md">Ver CSV para coordinación</button></div><div id="rcsvbox"></div>';
    document.getElementById('rsec').addEventListener('change', e => load(e.target.value));
    document.getElementById('rprint').addEventListener('click', () => window.print());
    document.getElementById('rcsv').addEventListener('click', () => {
      const t = 'Estudiante,Sección,Presente,Ausente,Tardanza,Excusa,% inasistencia\n' + current.map(s => '"' + s.name.replace(/"/g, '""') + '","' + s.section.replace(/"/g, '""') + '",' + s.p + ',' + s.a + ',' + s.t + ',' + s.e + ',' + (s.n ? pc(s.a, s.n).toFixed(1) : '0')).join('\n');
      document.getElementById('rcsvbox').innerHTML = '<label class="block font-label-md mt-3" for="rcsvt">Copia este texto y pégalo en Excel o Google Sheets</label><textarea id="rcsvt" readonly rows="8" class="w-full mt-1 p-3 rounded-lg bg-surface-container-low font-body-sm"></textarea>';
      const ta = document.getElementById('rcsvt'); ta.value = t; ta.select();
    });
    load('');
  }).catch(() => {});
})();
