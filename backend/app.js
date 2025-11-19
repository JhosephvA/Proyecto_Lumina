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
require('./src/models/Material');

console.log("JWT SECRET:", process.env.JWT_SECRET);

const app = express();

// =====================================================
// 1. CORS (Frontend corre en :3001, backend en :3000)
// =====================================================
app.use(cors({
  origin: 'http://localhost:3001',  // ⬅ FRONTEND
  credentials: true
}));

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(applyRateLimiting);

// =====================================================
// 2. Rutas del backend
// =====================================================
const authRoutes = require('./src/routes/auth.routes');
const adminRoutes = require('./src/routes/admin.routes');
const professorRoutes = require('./src/routes/professor.routes');
const studentRoutes = require('./src/routes/student.routes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/professor', professorRoutes); // ⬅ NECESARIO PARA /grades
app.use('/api/student', studentRoutes);

// Ruta prueba
app.get('/', (req, res) => {
  res.send('Academia Backend API - Status OK');
});

// 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
    error: config.env === 'development' ? err : {},
  });
});

// =====================================================
// 3. Iniciar servidor + sincronizar DB
// =====================================================
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    // Solo crea tablas nuevas si no existen, no toca tablas existentes
    await sequelize.sync({ alter: false });
    console.log('Tablas sincronizadas correctamente.');

    app.listen(config.port, () => {
      console.log(
        `Servidor backend corriendo en http://localhost:${config.port} (modo ${config.env})`
      );
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
}

startServer();
