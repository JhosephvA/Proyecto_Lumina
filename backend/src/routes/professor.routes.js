const express = require('express');
const taskController = require('../controllers/task.controller');
const submissionController = require('../controllers/submission.controller');
const progressController = require('../controllers/progress.controller');
const { requireAuth, requireRole } = require('../middlewares/auth.middleware');
const { Course } = require('../models/associations'); // tu modelo Course
const config = require('../config/config');

const router = express.Router();

// Middleware de autorización para todas las rutas de Profesor
router.use(requireAuth, requireRole([config.roles.PROFESSOR]));

/* ==========================================
   🔹 Cursos del profesor
========================================== */
router.get('/courses', async (req, res) => {
  try {
    const profesorId = req.user.id; // viene de requireAuth

    const cursos = await Course.findAll({
      where: { profesorId },
      attributes: ['id', 'nombre', 'descripcion', 'profesorId'],
    });

    res.json(cursos); // devolver array directo
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los cursos del profesor' });
  }
});

/* ==========================================
   🔹 Crear un nuevo curso (asignado al profesor logueado)
========================================== */
router.post('/courses', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const profesorId = req.user.id; // asigna automáticamente al profesor logueado

    const newCourse = await Course.create({ nombre, descripcion, profesorId });

    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear el curso' });
  }
});

/* ==========================================
   🔹 Rutas de Tareas (CRUD)
========================================== */
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

/* ==========================================
   🔹 Rutas de Entregas y Calificación
========================================== */
router.get('/tasks/:taskId/submissions', submissionController.getSubmissionsByTask);
router.put('/submissions/:id/grade', submissionController.gradeSubmission);

/* ==========================================
   🔹 Rutas de Progreso y Consulta de IA
========================================== */
router.get('/courses/:courseId/progress', progressController.getCourseProgress);
router.get('/ai/student/:studentId', progressController.consultAIModule);

module.exports = router;
