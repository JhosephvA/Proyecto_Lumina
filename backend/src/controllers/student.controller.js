const studentService = require('../services/student.service');
const { Task, Enrollment, Course } = require('../models/associations');

/**
 * Obtiene los cursos del estudiante.
 */
const getMyCourses = async (req, res, next) => {
  try {
    const courses = await studentService.getStudentCourses(req.user.id);
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene los materiales de un curso.
 */
const getCourseMaterials = async (req, res, next) => {
  try {
    const materials = await studentService.getCourseMaterials(req.user.id, req.params.courseId);
    res.status(200).json(materials);
  } catch (error) {
    next(error);
  }
};

/**
 * Permite al estudiante entregar una tarea.
 */
const submitTask = async (req, res, next) => {
  try {
    // 🔹 Verificamos que Multer haya procesado el archivo
    if (!req.file) {
      const error = new Error('Archivo es obligatorio');
      error.status = 400;
      throw error;
    }

    // Guardamos la URL relativa para frontend
    const archivoURL = `/uploads/${req.file.filename}`;

    const result = await studentService.submitTask(req.user.id, req.params.taskId, archivoURL);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene las notas del estudiante.
 */
const getMyGrades = async (req, res, next) => {
  try {
    const grades = await studentService.getStudentGrades(req.user.id);
    res.status(200).json(grades);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene las recomendaciones de IA.
 */
const getMyAiRecommendations = async (req, res, next) => {
  try {
    const recommendations = await studentService.getAiRecommendations(req.user.id);
    res.status(200).json(recommendations);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene las tareas del estudiante.
 */
const getMyTasks = async (req, res, next) => {
  try {
    const studentId = req.user.id;

    // Obtener cursos donde está matriculado
    const enrollments = await Enrollment.findAll({
      where: { estudianteId: studentId },
      attributes: ['courseId'],
    });
    const courseIds = enrollments.map(e => e.courseId);

    // Obtener tareas de esos cursos
    const tasks = await Task.findAll({
      where: { courseId: courseIds },
      include: [
        {
          model: Course,
          as: 'Curso',
          attributes: ['id', 'nombre']
        }
      ],
    });

    // Formatear fecha como DD/MM/YYYY
    const formattedTasks = tasks.map(task => {
      let formattedDate = 'Sin fecha';
      if (task.fechaEntrega) {
        const d = new Date(task.fechaEntrega);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        formattedDate = `${day}/${month}/${year}`;
      }

      return {
        id: task.id,
        titulo: task.titulo,
        descripcion: task.descripcion || 'Sin descripción',
        fechaEntrega: formattedDate,
        curso: {
          id: task.Curso?.id,
          nombre: task.Curso?.nombre
        }
      };
    });

    res.status(200).json(formattedTasks);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyCourses,
  getCourseMaterials,
  submitTask,
  getMyGrades,
  getMyAiRecommendations,
  getMyTasks,
};
