// Dashboard con datos reales.
(function () {
  const S = [...document.querySelectorAll('section')];
  if (S.length < 5) return;
  const MES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const DIA = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const pd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const card = (label, value, sub, col) => '<div class="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col"><span class="font-label-md text-label-md text-outline uppercase tracking-wider">' + label + '</span><span class="font-display-lg text-display-lg text-' + col + ' mt-space-xs">' + value + '</span><span class="font-body-sm text-body-sm text-on-surface-variant mt-1">' + sub + '</span></div>';
  const box = (cls, title, sub, inner) => '<div class="' + cls + ' bg-surface-container-lowest rounded-xl shadow-sm p-space-lg"><h2 class="font-headline-md text-headline-md text-on-surface">' + title + '</h2><p class="font-body-sm text-body-sm text-on-surface-variant mb-space-md">' + sub + '</p>' + inner + '</div>';
  const wa = p => { const x = String(p || '').replace(/\D/g, ''); return x.length === 10 ? '1' + x : x; };

  api('/api/dashboard').then(d => {
    const sec = d.sections, sum = k => sec.reduce((a, s) => a + s[k], 0);
    const total = sum('total'), p = sum('p'), a = sum('a'), t = sum('t'), e = sum('e'), reg = p + a + t + e;
    const dt = pd(d.date), fecha = DIA[dt.getDay()] + ' ' + dt.getDate() + ' de ' + MES[dt.getMonth()] + ' de ' + dt.getFullYear();
    const pct = (x, n) => n ? (x / n * 100).toFixed(1) + '%' : '0%';

    // Cabecera: fecha y resumen
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), nodes = [];
    while (w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(n => {
      if (/\d{1,2} de \w+,? (de )?2024/i.test(n.nodeValue)) n.nodeValue = n.nodeValue.replace(/\w+,? ?\d{1,2} de \w+,? (de )?2024|\d{1,2} de \w+,? (de )?2024/i, fecha);
      n.nodeValue = n.nodeValue.replace(/2024/g, String(dt.getFullYear()));
    });
    const closed = sec.filter(s => s.total > 0 && s.p + s.a + s.t + s.e >= s.total).length;
    const hp = S[0].querySelector('p'); if (hp) hp.textContent = sec.length ? closed + ' de ' + sec.length + ' secciones completaron el pase de lista del ' + fecha + '.' : 'Crea tu primera sección para empezar a registrar asistencia.';

    // Tarjetas
    S[1].innerHTML = card('Matrícula general', total, 'estudiantes activos', 'on-surface') +
      card('Presentes', p, pct(p, total) + ' de la matrícula', 'secondary') +
      card('Ausencias', a, e + ' con excusa', 'error') +
      card('Tardanzas', t, pct(t, total) + ' de la matrícula', 'tertiary');

    // Tendencia
    const days = {}; d.trend.forEach(r => { (days[r.d] = days[r.d] || {})[r.status] = r.c; });
    const keys = Object.keys(days).slice(-5);
    const bar = (v, c, n) => '<div class="w-4 bg-' + c + ' rounded-t-sm" style="height:' + Math.max(2, total ? v / total * 100 : 0) + '%" title="' + n + ': ' + v + '"></div>';
    const bars = keys.length ? '<div class="flex items-end justify-around gap-2 h-48 border-b border-surface-container">' + keys.map(k => { const r = days[k]; return '<div class="flex flex-col items-center justify-end h-full flex-1"><div class="flex items-end gap-1 h-full w-full justify-center">' + bar(r.P || 0, 'secondary', 'Presentes') + bar(r.T || 0, 'tertiary', 'Tardanzas') + bar(r.A || 0, 'error', 'Ausentes') + '</div></div>'; }).join('') + '</div><div class="flex justify-around mt-2 font-label-sm text-label-sm text-outline">' + keys.map(k => '<span class="flex-1 text-center">' + DIA[pd(k).getDay()].slice(0, 3) + ' ' + pd(k).getDate() + '</span>').join('') + '</div><div class="flex gap-4 mt-3 font-label-sm text-label-sm text-on-surface-variant"><span>Verde: presentes</span><span>Ámbar: tardanzas</span><span>Rojo: ausentes</span></div>' : '<p class="text-outline">Aún no hay asistencia registrada.</p>';
    const grades = sec.length ? sec.map(s => { const r = s.hn ? (1 - s.ha / s.hn) * 100 : null, c = r === null ? 'outline' : r >= 90 ? 'secondary' : r >= 80 ? 'tertiary' : 'error'; return '<div class="mb-space-md"><div class="flex justify-between font-label-md text-label-md"><span>' + esc(s.name) + '</span><span class="text-' + c + ' font-bold">' + (r === null ? 'Sin datos' : r.toFixed(1) + '%') + '</span></div><div class="h-2 bg-surface-container rounded-full overflow-hidden mt-1"><div class="h-full bg-' + c + ' rounded-full" style="width:' + (r || 0) + '%"></div></div></div>'; }).join('') : '<p class="text-outline">Sin secciones.</p>';
    S[2].innerHTML = box('lg:col-span-7', 'Tendencia de asistencia', 'Últimos días con registro', bars) + box('lg:col-span-5', 'Asistencia por sección', 'Porcentaje acumulado de presencia', grades);

    // Alertas y aulas
    const al = d.alerts.length ? d.alerts.map(x => {
      const msg = encodeURIComponent('Buen día. Le informamos que ' + x.name + ' acumula ' + x.streak + ' faltas consecutivas. Por favor comuníquese con el centro educativo.');
      return '<div class="flex items-center justify-between gap-3 p-3 rounded-lg bg-surface-container-low mb-2"><div class="min-w-0"><div class="font-title-md text-body-md font-semibold truncate">' + esc(x.name) + '</div><div class="font-body-sm text-body-sm text-on-surface-variant">' + esc(x.section) + ' · <span class="text-error font-semibold">' + x.streak + ' faltas seguidas</span></div></div><div class="flex gap-2 shrink-0"><a class="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md hover:bg-primary hover:text-on-primary" href="/excusas.html?student=' + x.id + '">Excusa</a>' + (x.phone ? '<a class="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-md" target="_blank" rel="noopener noreferrer" href="https://wa.me/' + wa(x.phone) + '?text=' + msg + '">Notificar</a>' : '') + '</div></div>';
    }).join('') : '<p class="text-outline">Sin alertas: nadie acumula 3 faltas seguidas.</p>';
    const aulas = sec.length ? sec.map(s => { const r = s.p + s.a + s.t + s.e, ok = s.total > 0 && r >= s.total; return '<div class="flex items-center justify-between p-3 rounded-lg ' + (ok ? 'bg-secondary-container/30' : 'bg-error-container/40') + ' mb-2"><div><div class="font-title-md text-body-md font-semibold">' + esc(s.name) + '</div><div class="font-body-sm text-body-sm text-on-surface-variant">' + r + ' de ' + s.total + ' registrados</div></div>' + (ok ? '<span class="text-secondary font-semibold">Completo</span>' : '<a class="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-md" href="/registro-diario.html">Registrar</a>') + '</div>'; }).join('') + '<div class="mt-3 flex justify-between font-label-md"><span class="text-on-surface-variant">Secciones completas:</span><span class="text-primary font-bold">' + closed + ' de ' + sec.length + '</span></div>' : '<p class="text-outline">Sin secciones.</p>';
    S[3].innerHTML = box('lg:col-span-7', 'Alertas críticas de inasistencia', 'Estudiantes con 3 o más faltas consecutivas', al) + box('lg:col-span-5', 'Estado de las secciones', 'Pase de lista de ' + fecha, aulas);
  }).catch(() => {});

  // Informes: los botones de PDF y Excel del diseño no tienen función; se deja el acceso a Reportes.
  document.querySelectorAll('button').forEach(b => { if (/Parte Diario|Consolidado/i.test(b.textContent)) b.remove(); else if (/Módulo de Reportes/i.test(b.textContent)) b.addEventListener('click', () => { location.href = '/reportes.html'; }); });
})();
