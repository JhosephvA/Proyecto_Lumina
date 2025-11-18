const express = require('express');
const taskController = require('../controllers/task.controller');
const submissionController = require('../controllers/submission.controller');
const progressController = require('../controllers/progress.controller');
const { requireAuth, requireRole } = require('../middlewares/auth.middleware');
const config = require('../config/config');

const router = express.Router();

// Middleware de autorización para todas las rutas de Profesor
router.use(requireAuth, requireRole([config.roles.PROFESSOR]));

// Rutas de Tareas (CRUD)
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

// Rutas de Entregas y Calificación
router.get('/tasks/:taskId/submissions', submissionController.getSubmissionsByTask);
router.put('/submissions/:id/grade', submissionController.gradeSubmission);

// Rutas de Progreso y Consulta de IA
router.get('/courses/:courseId/progress', progressController.getCourseProgress);
router.get('/ai/student/:studentId', progressController.consultAIModule);

module.exports = router;