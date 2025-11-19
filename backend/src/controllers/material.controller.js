const Material = require('../models/Material');
const Course = require('../models/Course');

// Crear material
exports.createMaterial = async (req, res) => {
  try {
    const { titulo, descripcion, archivoUrl, courseId } = req.body;
    const professorId = req.user.id; // viene del token

    // 1️⃣ Verificar que el curso pertenezca al profesor
    const course = await Course.findOne({
      where: { id: courseId, profesorId: professorId }
    });

    if (!course) {
      return res.status(403).json({
        message: "No puedes subir material a un curso que no te pertenece"
      });
    }

    // 2️⃣ Crear el material
    const material = await Material.create({
      titulo,
      descripcion,
      archivoUrl,
      courseId
    });

    res.status(201).json(material);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear material", error });
  }
};

// Listar materiales
exports.getMaterials = async (req, res) => {
  try {
    const materiales = await Material.findAll({
      include: [{ model: Course, as: "curso" }],
    });

    res.json(materiales);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener materiales", error });
  }
};
