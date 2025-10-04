const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const { createUser, login, getCurrentUser } = require('./controllers/users');
const { validateSignup, validateSignin } = require('./utils/validators');
const errorHandler = require('./middlewares/error');
const {errors} = require('celebrate');
const app = express();
const PORT = 3000;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');

app.use(express.json());
app.use(requestLogger);
app.use(cors());
app.options('*', cors());

// Rutas públicas con validación
app.post('/signup', validateSignup, createUser);
app.post('/signin', validateSignin, login);

// Middleware de autorización
app.use(auth);

// Rutas protegidas
app.get('/users/me', getCurrentUser);

// Conexión a Mongo
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aroundb19';
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB conectado');
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error conectando a MongoDB:', err.message);
    process.exit(1);
  });


app.use(errorLogger);
app.use(errors());


// Middleware de errores centralizado
app.use(errorHandler);