const { Task, Course, Submission, User } = require('../models/associations');
const config = require('../config/config');

/**
 * Verifica si el usuario es el profesor del curso.
 */
const isProfessorOfCourse = async (profesorId, courseId) => {
  const course = await Course.findByPk(courseId);
  if (!course || course.profesorId !== profesorId) {
    const error = new Error('Acceso denegado. No es el profesor de este curso.');
    error.status = 403;
    throw error;
  }
  return course;
};

/**
 * Crea una nueva tarea.
 */
const createTask = async (profesorId, taskData) => {
  await isProfessorOfCourse(profesorId, taskData.courseId);
  return Task.create(taskData);
};

/**
 * Obtiene las tareas de un curso.
 */
const getTasksByCourse = async (courseId) => {
  return Task.findAll({ where: { courseId } });
};

/**
 * Obtiene una tarea por ID.
 */
const getTaskById = async (taskId) => {
  const task = await Task.findByPk(taskId);
  if (!task) {
    const error = new Error('Tarea no encontrada');
    error.status = 404;
    throw error;
  }
  return task;
};

/**
 * Actualiza una tarea.
 */
const updateTask = async (profesorId, taskId, updateData) => {
  const task = await getTaskById(taskId);
  await isProfessorOfCourse(profesorId, task.courseId);

  await task.update(updateData);
  return task;
};

/**
 * Elimina una tarea.
 */
const deleteTask = async (profesorId, taskId) => {
  const task = await getTaskById(taskId);
  await isProfessorOfCourse(profesorId, task.courseId);

  const result = await Task.destroy({ where: { id: taskId } });
  return result > 0;
};

module.exports = {
  createTask,
  getTasksByCourse,
  getTaskById,
  updateTask,
  deleteTask,
};