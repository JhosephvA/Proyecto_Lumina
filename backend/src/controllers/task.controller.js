const taskService = require('../services/task.service');

/**
 * Crea una nueva tarea (Profesor).
 */
const createTask = async (req, res, next) => {
  try {
    const profesorId = req.user.id;
    const newTask = await taskService.createTask(profesorId, req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene las tareas de un curso (Profesor).
 */
const getTasksByCourse = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasksByCourse(req.params.courseId);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

/**
 * Actualiza una tarea (Profesor).
 */
const updateTask = async (req, res, next) => {
  try {
    const profesorId = req.user.id;
    const updatedTask = await taskService.updateTask(profesorId, req.params.id, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

/**
 * Elimina una tarea (Profesor).
 */
const deleteTask = async (req, res, next) => {
  try {
    const profesorId = req.user.id;
    await taskService.deleteTask(profesorId, req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasksByCourse,
  updateTask,
  deleteTask,
};