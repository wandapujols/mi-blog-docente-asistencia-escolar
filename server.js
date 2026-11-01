const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

let estudiantesDemo = [
    { id: 1, student_code: 'EST-8921', first_name: 'Diego', last_name: 'Morales Vargas', grade: '5°', section: 'B', guardian_name: 'Ana Vargas', guardian_phone: '809-555-0192', active: true },
    { id: 2, student_code: 'EST-7740', first_name: 'Sofía', last_name: 'Restrepo Luján', grade: '3°', section: 'A', guardian_name: 'Carlos Restrepo', guardian_phone: '809-555-7740', active: true },
    { id: 3, student_code: 'EST-6192', first_name: 'Mateo', last_name: 'Alarcón Quispe', grade: '4°', section: 'C', guardian_name: 'Lucía Quispe', guardian_phone: '809-555-6192', active: true },
    { id: 4, student_code: 'EST-5510', first_name: 'Camila', last_name: 'Fernández Silva', grade: '2°', section: 'B', guardian_name: 'Pedro Fernández', guardian_phone: '809-555-5510', active: true }
];

let asistenciaDemo = [];

app.post('/api/auth/login', (req, res) => {
    const { email } = req.body;
    const role = (email && (email.includes('dir') || email.includes('admin') || email.includes('direccion'))) ? 'admin' : 'teacher';
    
    res.json({
        token: 'token-demo-libre',
        user: {
            id: 1,
            email: email || 'docente@eduasiste.edu.do',
            name: role === 'admin' ? 'Dirección Académica' : 'Prof. Carmen Mendoza',
            role: role
        }
    });
});

app.get('/api/students', (req, res) => res.json(estudiantesDemo));
app.post('/api/students', (req, res) => {
    const nuevo = { id: estudiantesDemo.length + 1, ...req.body, active: true };
    estudiantesDemo.push(nuevo);
    res.status(201).json(nuevo);
});

app.get('/api/attendance', (req, res) => res.json(asistenciaDemo));
app.post('/api/attendance', (req, res) => {
    const { student_id, attendance_date, status, note } = req.body;
    const index = asistenciaDemo.findIndex(a => a.student_id == student_id && a.attendance_date == attendance_date);
    const registro = { student_id, attendance_date, status, note };
    if (index >= 0) {
        asistenciaDemo[index] = registro;
    } else {
        asistenciaDemo.push(registro);
    }
    res.status(201).json(registro);
});

app.get('/api/reports/summary', (req, res) => {
    res.json({
        presentes: 1142,
        ausentes: 64,
        tardanzas: 42,
        justificados: 18,
        total_estudiantes: 1248
    });
});

app.get('/dashboard.html', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));
app.get('/dashboard_admin.html', (req, res) => res.sendFile(path.join(__dirname, 'dashboard_admin.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'inicio_de_sesion.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor EduAsiste activo en puerto ${PORT}`));
