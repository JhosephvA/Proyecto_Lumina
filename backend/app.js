const express = require('express');
const cors = require('cors');
const config = require('./src/config/config');
const sequelize = require('./src/config/sequelize-config');
const { applyRateLimiting } = require('./src/middlewares/rateLimiter');

// Importar modelos
require('./src/models/associations');
require('./src/models/User');
require('./src/models/Course');
require('./src/models/Enrollment');
require('./src/models/Task');
require('./src/models/Submission');
require('./src/models/StudyLog');
require('./src/models/AiRecommendation');

console.log("JWT SECRET:", process.env.JWT_SECRET);

const app = express();

// ====== 1. HABILITAR CORS ======
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
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

// Ruta prueba
app.get('/', (req, res) => {
  res.send('Academia Backend API - Status OK');
});

// 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Error global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
    error: config.env === 'development' ? err : {},
  });
});

// Servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    // 🔹 Sincronizar modelos con la DB (crear tablas que faltan)
    await sequelize.sync({ alter: true }); // ⬅️ Esto crea/actualiza tablas automáticamente
    console.log('Tablas sincronizadas correctamente con la base de datos.');

    app.listen(config.port, () => {
      console.log(`Servidor corriendo en http://localhost:${config.port} en modo ${config.env}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
}

startServer();
