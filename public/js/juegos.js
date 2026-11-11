// Juegos: cuadro de honor, memoria y quiz con preguntas que agrega la docente.
(function () {
  const main = document.querySelector('main');
  if (!main) return;
  const card = 'bg-surface-container-lowest rounded-xl shadow-sm p-space-lg';
  const btn = 'px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md hover:opacity-90';
  const btn2 = 'px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md hover:bg-surface-container-high';
  const field = 'w-full rounded-lg bg-surface-container-low px-3 py-2 font-body-md text-body-md text-on-surface';
  main.innerHTML = '<div class="max-w-5xl mx-auto p-space-md md:p-space-lg"><h1 class="font-headline-lg text-headline-lg text-on-surface">Juegos y retos</h1><p class="font-body-md text-body-md text-on-surface-variant mb-space-md">Actividades para el aula y reconocimiento a la buena asistencia.</p><div id="gtabs" class="flex flex-wrap gap-2 mb-space-md"></div><div id="gpanel"></div></div>';
  const panel = document.getElementById('gpanel'), tabs = document.getElementById('gtabs');
  const TABS = [['honor', '🏆 Cuadro de honor'], ['memoria', '🌸 Memoria'], ['quiz', '❓ Quiz']];
  let tick;
  function go(k) {
    clearInterval(tick);
    tabs.innerHTML = TABS.map(t => '<button type="button" data-k="' + t[0] + '" class="px-4 py-2 rounded-full font-label-md ' + (t[0] === k ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface') + '">' + t[1] + '</button>').join('');
    tabs.querySelectorAll('button').forEach(b => b.addEventListener('click', () => go(b.dataset.k)));
    ({ honor, memoria, quiz })[k]();
  }

  // ---- Cuadro de honor ----
  async function honor() {
    panel.innerHTML = '<p class="text-outline">Cargando...</p>';
    try {
      const d = await api('/api/reports/overview');
      const L = d.students.filter(s => s.n > 0).map(s => ({ s, pts: s.p * 10 + s.t * 5 + s.e * 8, pct: (s.n - s.a) / s.n * 100 })).sort((a, b) => b.pts - a.pts || b.pct - a.pct);
      if (!L.length) { panel.innerHTML = '<div class="' + card + '"><p class="text-outline">Aún no hay asistencia registrada. Cuando marques asistencia, aquí aparecen las estrellas.</p></div>'; return; }
      const stars = p => p >= 95 ? '⭐⭐⭐' : p >= 90 ? '⭐⭐' : p >= 85 ? '⭐' : '🌱';
      const medal = ['🥇', '🥈', '🥉'];
      panel.innerHTML = '<div class="' + card + '"><h2 class="font-headline-md text-headline-md">Puntos de asistencia</h2><p class="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Presente 10 puntos, excusa 8, tardanza 5, ausencia 0. Estrellas: 3 con 95% o más, 2 con 90%, 1 con 85%.</p>' +
        L.map((o, i) => '<div class="flex items-center justify-between gap-3 py-2 border-b border-surface-container"><div class="flex items-center gap-3 min-w-0"><span class="text-2xl w-8 text-center">' + (medal[i] || (i + 1)) + '</span><div class="min-w-0"><div class="font-title-md font-semibold truncate">' + esc(o.s.name) + '</div><div class="font-body-sm text-body-sm text-on-surface-variant">' + esc(o.s.section) + ' · ' + o.pct.toFixed(0) + '% de asistencia</div></div></div><div class="text-right shrink-0"><div>' + stars(o.pct) + '</div><div class="font-label-md text-primary font-bold">' + o.pts + ' pts</div></div></div>').join('') + '</div>';
    } catch (e) { notify(e.message, false); }
  }

  // ---- Memoria ----
  function memoria() {
    const E = ['🌸', '🦋', '🍓', '🌈', '🐱', '🍭', '🎀', '🌷'];
    let cards, open, moves, found, t0, lock;
    function start() { cards = [...E, ...E].sort(() => Math.random() - .5).map(e => ({ e, done: false })); open = []; moves = 0; found = 0; t0 = null; lock = false; clearInterval(tick); draw(); }
    function draw() {
      panel.innerHTML = '<div class="' + card + '"><div class="flex flex-wrap items-center justify-between gap-2 mb-space-md"><div class="font-label-md">Movimientos: <b>' + moves + '</b> · Parejas: <b>' + found + '/8</b> · Tiempo: <b id="mt">0 s</b></div><button id="mnew" type="button" class="' + btn2 + '">Nueva partida</button></div>' +
        (found === 8 ? '<p class="mb-space-md font-title-md text-primary font-bold">🎉 ¡Lo lograste en ' + moves + ' movimientos!</p>' : '') +
        '<div class="grid grid-cols-4 gap-2 max-w-md mx-auto">' + cards.map((c, i) => { const up = c.done || open.includes(i); return '<button type="button" data-i="' + i + '" aria-label="' + (up ? c.e : 'Carta oculta') + '" class="aspect-square rounded-xl text-3xl flex items-center justify-center ' + (c.done ? 'bg-primary-fixed' : up ? 'bg-surface-container-high' : 'bg-primary text-on-primary') + '">' + (up ? c.e : '?') + '</button>'; }).join('') + '</div></div>';
      document.getElementById('mnew').addEventListener('click', start);
      panel.querySelectorAll('[data-i]').forEach(b => b.addEventListener('click', () => flip(+b.dataset.i)));
    }
    function flip(i) {
      if (lock || cards[i].done || open.includes(i)) return;
      if (!t0) { t0 = Date.now(); tick = setInterval(() => { const e = document.getElementById('mt'); if (e) e.textContent = Math.floor((Date.now() - t0) / 1000) + ' s'; }, 500); }
      open.push(i);
      if (open.length === 2) {
        moves++; const [a, b] = open;
        if (cards[a].e === cards[b].e) { cards[a].done = cards[b].done = true; found++; open = []; if (found === 8) clearInterval(tick); }
        else { lock = true; draw(); setTimeout(() => { open = []; lock = false; draw(); }, 800); return; }
      }
      draw();
    }
    start();
  }

  // ---- Quiz ----
  async function quiz() {
    let qs = [];
    try { qs = await api('/api/quiz'); } catch (e) { return notify(e.message, false); }
    function menu() {
      panel.innerHTML = '<div class="grid md:grid-cols-2 gap-space-md"><div class="' + card + '"><h2 class="font-headline-md text-headline-md">Jugar</h2><p class="font-body-sm text-body-sm text-on-surface-variant mb-space-md">' + qs.length + ' preguntas disponibles. Se juegan hasta 10, en orden aleatorio.</p><button id="qplay" type="button" class="' + btn + '"' + (qs.length ? '' : ' disabled') + '>Empezar quiz</button>' +
        '<h3 class="font-title-md font-semibold mt-space-lg mb-2">Preguntas guardadas</h3><div class="max-h-64 overflow-y-auto">' + (qs.map(q => '<div class="flex justify-between gap-2 py-1 border-b border-surface-container"><span class="font-body-sm text-body-sm">' + esc(q.question) + '</span><button type="button" data-del="' + q.id + '" class="text-error font-label-md" aria-label="Eliminar pregunta">Quitar</button></div>').join('') || '<p class="text-outline">Aún no hay preguntas.</p>') + '</div></div>' +
        '<div class="' + card + '"><h2 class="font-headline-md text-headline-md">Agregar pregunta</h2><label class="block font-label-md mt-2" for="qq">Pregunta</label><textarea id="qq" rows="2" class="' + field + '"></textarea>' +
        [0, 1, 2, 3].map(i => '<label class="block font-label-md mt-2" for="qo' + i + '">Opción ' + 'ABCD'[i] + (i < 2 ? ' (obligatoria)' : ' (opcional)') + '</label><input id="qo' + i + '" class="' + field + '" maxlength="120">').join('') +
        '<label class="block font-label-md mt-2" for="qc">Respuesta correcta</label><select id="qc" class="' + field + '"><option value="0">A</option><option value="1">B</option><option value="2">C</option><option value="3">D</option></select><button id="qadd" type="button" class="' + btn + ' mt-space-md">Guardar pregunta</button></div></div>';
      const p = document.getElementById('qplay'); if (p) p.addEventListener('click', play);
      panel.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', async () => { try { await api('/api/quiz/' + b.dataset.del, { method: 'DELETE' }); qs = qs.filter(q => String(q.id) !== b.dataset.del); menu(); } catch (e) { notify(e.message, false); } }));
      document.getElementById('qadd').addEventListener('click', async () => {
        const o = [0, 1, 2, 3].map(i => document.getElementById('qo' + i).value.trim()), c = +document.getElementById('qc').value;
        if (!o[c]) return notify('La respuesta correcta debe tener texto', false);
        const f = o.filter(Boolean);
        try { await api('/api/quiz', { method: 'POST', body: { question: document.getElementById('qq').value, options: f, correct: f.indexOf(o[c]) } }); qs = await api('/api/quiz'); notify('Pregunta agregada'); menu(); } catch (e) { notify(e.message, false); }
      });
    }
    function play() {
      const list = [...qs].sort(() => Math.random() - .5).slice(0, 10); let i = 0, score = 0;
      function show() {
        if (i >= list.length) { panel.innerHTML = '<div class="' + card + ' text-center"><div class="text-5xl mb-2">' + (score === list.length ? '🏆' : '🌟') + '</div><h2 class="font-headline-md text-headline-md">' + score + ' de ' + list.length + ' correctas</h2><p class="font-body-md text-on-surface-variant mb-space-md">' + (score === list.length ? '¡Perfecto!' : '¡Buen trabajo, sigue practicando!') + '</p><button id="qagain" type="button" class="' + btn + '">Volver</button></div>'; document.getElementById('qagain').addEventListener('click', menu); return; }
        const q = list[i];
        panel.innerHTML = '<div class="' + card + '"><p class="font-label-md text-outline">Pregunta ' + (i + 1) + ' de ' + list.length + ' · Puntos: ' + score + '</p><h2 class="font-headline-md text-headline-md my-space-md">' + esc(q.question) + '</h2><div class="grid gap-2">' + q.options.map((o, k) => '<button type="button" data-o="' + k + '" class="text-left px-4 py-3 rounded-lg bg-surface-container hover:bg-surface-container-high font-body-md">' + 'ABCD'[k] + '. ' + esc(o) + '</button>').join('') + '</div></div>';
        panel.querySelectorAll('[data-o]').forEach(b => b.addEventListener('click', () => {
          const k = +b.dataset.o; if (k === q.correct) score++;
          panel.querySelectorAll('[data-o]').forEach(x => { x.disabled = true; if (+x.dataset.o === q.correct) x.className = 'text-left px-4 py-3 rounded-lg bg-secondary-container text-on-secondary-container font-bold'; else if (x === b) x.className = 'text-left px-4 py-3 rounded-lg bg-error-container text-on-error-container'; });
          setTimeout(() => { i++; show(); }, 1100);
        }));
      }
      show();
    }
    menu();
  }
  go('honor');
})();
