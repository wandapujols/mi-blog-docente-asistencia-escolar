// Registro de nuevo estudiante conectado a la base de datos.
(function () {
  const v = id => { const e = document.getElementById(id); return e ? e.value.trim() : ''; };
  const t = id => { const e = document.getElementById(id); return e && e.selectedOptions && e.selectedOptions[0] ? e.selectedOptions[0].textContent.trim() : v(id); };
  window.submitStudent = async function () {
    const nombres = v('studentNames'), ap = v('paternalSurname'), am = v('maternalSurname');
    if (!nombres || !ap) return notify('Escribe los nombres y el apellido paterno', false);
    const name = [ap, am].filter(Boolean).join(' ') + ', ' + nombres;
    const secName = (t('academicGrade') + ' ' + t('academicSection')).replace(/\s+/g, ' ').trim() || 'General';
    try {
      const sec = await api('/api/sections', { method: 'POST', body: { name: secName } });
      await api('/api/students', { method: 'POST', body: { name, section_id: sec.id, guardian_phone: v('guardianPhone') } });
      notify('Estudiante registrado en ' + secName);
      document.getElementById('studentRegistrationForm').reset();
    } catch (e) { notify(e.message, false); }
  };
  window.saveDraft = function () { notify('Los borradores no se guardan: usa "Guardar y Registrar Estudiante".', false); };
})();
