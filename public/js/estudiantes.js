// Listado de estudiantes conectado a la base de datos.
(function () {
  const tbody = document.getElementById('studentsTbody');
  if (!tbody) return;
  const count = document.getElementById('visibleStudentsCount');
  const search = document.getElementById('studentSearchInput');
  const wa = p => { const x = String(p || '').replace(/\D/g, ''); return x.length === 10 ? '1' + x : x; };
  function row(s, r) {
    const n = r ? r.n : 0, pct = n ? (n - r.a) / n * 100 : null;
    const col = pct === null ? 'outline' : pct >= 90 ? 'secondary' : pct >= 80 ? 'tertiary' : 'error';
    const ini = esc(s.name.split(/[\s,]+/).filter(Boolean).slice(0, 2).map(x => x[0]).join('').toUpperCase());
    return '<tr class="hover:bg-surface-container-low/60 transition-colors group" data-id="' + s.id + '">' +
      '<td class="py-3 pl-space-md pr-2"><input class="student-checkbox w-4 h-4 rounded text-primary cursor-pointer accent-primary" type="checkbox"/></td>' +
      '<td class="py-3 px-space-md"><div class="flex items-center gap-space-sm"><div class="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-md flex-shrink-0">' + ini + '</div>' +
      '<div class="flex flex-col min-w-0"><span class="font-title-md text-body-md font-semibold text-on-surface truncate">' + esc(s.name) + '</span><span class="font-body-sm text-body-sm text-on-surface-variant">Matrícula ' + s.id + '</span></div></div></td>' +
      '<td class="py-3 px-space-md"><span class="font-label-md text-label-md text-on-surface font-semibold">' + esc(s.section) + '</span></td>' +
      '<td class="py-3 px-space-md">' + (s.guardian_phone ? '<a class="inline-flex items-center gap-1 font-body-sm text-body-sm text-secondary hover:underline" href="https://wa.me/' + wa(s.guardian_phone) + '" target="_blank" rel="noopener noreferrer"><span class="material-symbols-outlined text-[14px]">chat</span><span>' + esc(s.guardian_phone) + '</span></a>' : '<span class="text-outline">Sin teléfono</span>') + '</td>' +
      '<td class="py-3 px-space-md text-center"><span class="font-label-md font-bold text-' + col + '">' + (pct === null ? 'Sin registros' : pct.toFixed(1) + '%') + '</span>' + (n ? '<div class="text-[11px] text-outline">' + (n - r.a) + '/' + n + ' días</div>' : '') + '</td>' +
      '<td class="py-3 px-space-md text-outline">' + (n ? n + ' días registrados' : '—') + '</td>' +
      '<td class="py-3 px-space-md"><span class="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">Activo</span></td>' +
      '<td class="py-3 pr-space-md pl-space-sm text-right"><a class="p-1.5 rounded-lg text-outline hover:text-primary" title="Ver historial" href="/historial.html?student=' + s.id + '"><span class="material-symbols-outlined text-[18px]">history</span></a>' +
      '<button class="p-1.5 rounded-lg text-outline hover:text-error" title="Dar de baja" type="button" data-del="' + s.id + '"><span class="material-symbols-outlined text-[18px]">delete</span></button></td></tr>';
  }
  function filter() {
    const q = (search ? search.value : '').toLowerCase().trim();
    let v = 0;
    tbody.querySelectorAll('tr[data-id]').forEach(r => { const ok = !q || r.innerText.toLowerCase().includes(q); r.style.display = ok ? '' : 'none'; if (ok) v++; });
    if (count) count.textContent = v;
  }
  async function load() {
    try {
      const [list, secs] = await Promise.all([api('/api/students'), api('/api/sections')]);
      const reps = {};
      (await Promise.all(secs.map(s => api('/api/reports/section/' + s.id)))).forEach(a => a.forEach(r => { reps[r.id] = r; }));
      tbody.innerHTML = list.length ? list.map(s => row(s, reps[s.id])).join('') : '<tr><td colspan="8" class="p-8 text-center text-outline">No hay estudiantes todavía. Usa "Nuevo Estudiante" para agregar el primero.</td></tr>';
      filter();
    } catch (e) { notify(e.message, false); }
  }
  tbody.addEventListener('click', async e => {
    const b = e.target.closest('[data-del]'); if (!b) return;
    if (!confirm('¿Dar de baja a este estudiante? Su historial se conserva.')) return;
    try { await api('/api/students/' + b.dataset.del, { method: 'DELETE' }); notify('Estudiante dado de baja'); load(); } catch (er) { notify(er.message, false); }
  });
  if (search) search.addEventListener('input', filter);
  load();
})();
