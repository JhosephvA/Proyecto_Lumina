const express = require('express');
const config = require('./src/config/config');
const sequelize = require('./src/config/sequelize-config');
const { applyRateLimiting } = require('./src/middlewares/rateLimiter');

// Importar modelos para asegurar que Sequelize los conozca
require('./src/models/associations'); // Importar asociaciones para que se definan las relaciones
require('./src/models/User');
require('./src/models/Course');
require('./src/models/Enrollment');
require('./src/models/Task');
require('./src/models/Submission');
require('./src/models/StudyLog');
require('./src/models/AiRecommendation');

console.log("JWT SECRET:", process.env.JWT_SECRET);

const app = express();

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Aplicar Rate Limiting a rutas sensibles (como /auth/login)
app.use(applyRateLimiting);

// Rutas
const authRoutes = require('./src/routes/auth.routes');
const adminRoutes = require('./src/routes/admin.routes');
const professorRoutes = require('./src/routes/professor.routes');
const studentRoutes = require('./src/routes/student.routes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/professor', professorRoutes);
app.use('/api/student', studentRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Academia Backend API - Status OK');
});

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
    error: config.env === 'development' ? err : {},
  });
});

// Sincronizar modelos y arrancar el servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    // Para desarrollo, podemos usar sync({ force: true }) para recrear tablas
    // Para producción, usaremos migraciones (ver fase 11)
    // await sequelize.sync({ alter: true }); 
    // console.log('Modelos sincronizados con la base de datos.');

    app.listen(config.port, () => {
      console.log(`Servidor corriendo en http://localhost:${config.port} en modo ${config.env}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
}

startServer();