// Registro de excusas conectado a la base de datos.
(function () {
  const form = document.getElementById('excuse-form');
  if (!form) return;
  const today = new Date().toISOString().slice(0, 10);
  ['fecha-inicio', 'fecha-fin'].forEach(id => { const e = document.getElementById(id); if (e) e.value = today; });
  const box = document.createElement('div');
  box.className = 'flex flex-col gap-space-xs';
  box.innerHTML = '<label class="font-label-md text-label-md text-on-surface" for="excuse-student">Estudiante <span class="text-error">*</span></label><select id="excuse-student" class="w-full h-12 px-space-md bg-surface-container-lowest text-on-surface rounded font-body-md text-body-md"><option value="">Cargando...</option></select>';
  form.prepend(box);
  const sel = box.querySelector('select');
  const pre = new URLSearchParams(location.search).get('student');
  api('/api/students').then(l => {
    sel.innerHTML = '<option value="">Selecciona un estudiante</option>' + l.map(s => '<option value="' + s.id + '"' + (String(s.id) === pre ? ' selected' : '') + '>' + esc(s.name) + ' (' + esc(s.section) + ')</option>').join('');
  }).catch(() => {});
  window.handleSaveSuccess = async function () {
    const single = (form.querySelector('input[name="modalidad_fecha"]:checked') || {}).value === 'single';
    const from = document.getElementById('fecha-inicio').value;
    const to = single ? from : document.getElementById('fecha-fin').value;
    const m = document.getElementById('motivo-select');
    try {
      await api('/api/excuses', { method: 'POST', body: { student_id: +sel.value, date_from: from, date_to: to, motive: m.selectedOptions[0].textContent.trim(), has_doc: document.getElementById('toggle-soporte').checked, notes: document.getElementById('observaciones-docente').value } });
      notify('Excusa guardada: los días quedaron marcados como E');
    } catch (e) { notify(e.message, false); }
  };
})();
