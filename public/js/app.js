// Código compartido por todas las pantallas: sesión, navegación y utilidades.
(function () {
  const PAGES = { login: '/', dashboard: '/dashboard.html', 'registro-diario': '/registro-diario.html', estudiantes: '/estudiantes.html',
    'nuevo-estudiante': '/nuevo-estudiante.html', historial: '/historial.html', reportes: '/reportes.html', configuracion: '/configuracion.html' };
  const file = location.pathname.split('/').pop();
  const isLogin = file === '' || file === 'index.html';

  window.api = async function (url, opts) {
    opts = opts || {};
    const res = await fetch(url, { method: opts.method || 'GET', headers: { 'Content-Type': 'application/json' },
      body: opts.body ? JSON.stringify(opts.body) : undefined, credentials: 'same-origin' });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401 && !isLogin) { location.href = '/'; throw new Error('Sesión vencida'); }
    if (!res.ok) throw new Error(data.error || 'Error inesperado');
    return data;
  };
  window.logout = async function () { try { await fetch('/api/logout', { method: 'POST' }); } catch (e) {} location.href = '/'; };
  window.esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Navegación: los menús de Stitch traen data-path con el nombre de cada pantalla.
  document.querySelectorAll('[data-path]').forEach(el => {
    const p = el.dataset.path;
    if (p === 'login' && !isLogin) { el.addEventListener('click', e => { e.preventDefault(); window.logout(); }); return; }
    if (PAGES[p] && el.tagName === 'A') el.setAttribute('href', PAGES[p]);
  });
  document.querySelectorAll('button').forEach(b => {
    if (/Tomar Asistencia/i.test(b.textContent)) b.addEventListener('click', () => { location.href = PAGES['registro-diario']; });
  });

  // Pantalla de inicio de sesión
  if (isLogin) {
    window.handleSubmit = async function () {
      const btn = document.getElementById('submitBtn'), original = btn.innerHTML;
      btn.disabled = true; btn.textContent = 'Validando credenciales...';
      try {
        await window.api('/api/login', { method: 'POST', body: { email: document.getElementById('emailInput').value, password: document.getElementById('passInput').value } });
        location.href = PAGES.dashboard;
      } catch (e) { alert(e.message); btn.disabled = false; btn.innerHTML = original; }
    };
    window.fillDemo = function () { document.getElementById('emailInput').placeholder = 'admin@eduasiste.do'; document.getElementById('passInput').focus(); };
    window.api('/api/me').then(() => { location.href = PAGES.dashboard; }).catch(() => {});
  } else {
    // Protege las demás pantallas: sin sesión, vuelve al login.
    window.api('/api/me').then(u => { window.currentUser = u; document.dispatchEvent(new CustomEvent('user-ready', { detail: u })); }).catch(() => {});
  }
})();

// ---- Utilidades extra: avisos, nombre del usuario y acceso a Excusas ----
window.notify = function (text, ok) {
  const d = document.createElement('div');
  d.setAttribute('role', 'status');
  d.textContent = text;
  d.style.cssText = 'position:fixed;right:20px;bottom:20px;z-index:99999;padding:12px 18px;border-radius:12px;color:#fff;font:600 14px system-ui;box-shadow:0 8px 24px rgba(0,0,0,.25);background:' + (ok === false ? '#b3261e' : '#1f7a4d');
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 3500);
};
document.addEventListener('user-ready', e => {
  const name = e.detail.name;
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const list = [];
  while (w.nextNode()) list.push(w.currentNode);
  list.forEach(n => {
    if (/Mart[ií]n Ben[ií]tez|Carmen Mendoza/.test(n.nodeValue)) n.nodeValue = n.nodeValue.replace(/Prof\.\s*(Mart[ií]n Ben[ií]tez|Carmen Mendoza)/g, name).replace(/Mart[ií]n Ben[ií]tez|Carmen Mendoza/g, name);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const file = location.pathname.split('/').pop();
  const tpl = document.querySelector('a[data-path="' + (file === 'historial.html' ? 'reportes' : 'historial') + '"]');
  const reg = document.querySelector('a[data-path="registro-diario"]');
  if (!tpl || !reg || !tpl.closest('nav,aside') || document.querySelector('a[data-extra]')) return;
  const add = (after, label, icon, href) => {
    const c = tpl.cloneNode(true);
    c.dataset.extra = '1'; c.removeAttribute('data-path'); c.href = href;
    c.querySelectorAll('span').forEach(s => { s.textContent = s.classList.contains('material-symbols-outlined') ? icon : label; });
    after.after(c); return c;
  };
  add(add(reg, 'Excusas', 'event_busy', '/excusas.html'), 'Juegos', 'sports_esports', '/juegos.html');
});
