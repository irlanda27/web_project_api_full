const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const usersController = require('./controllers/users');
const { validateSignup, validateSignin } = require('./utils/validators');
const errorHandler = require('./middlewares/error');
const {errors} = require('celebrate');
const app = express();
const PORT = process.env.PORT || 3000;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');


app.use(express.json());
app.use(requestLogger);
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',    
  'http://127.0.0.1:3003',   
];

app.use((req, res, next) => {
  const { origin } = req.headers
  console.log(origin,)
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, HEAD, OPTIONS, POST, PUT, PATCH, DELETE',
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )

  if (req.method === 'OPTIONS') {
    res.sendStatus(200).end()
    return
  }

  next()
})

app.use('/', authRouter);
// Middleware de autorización
app.use(auth);
app.use('/users', usersRouter);


// Conexión a Mongo
const MONGO_URI = 'mongodb://127.0.0.1:27017/aroundb19';
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB conectado');
    
  })
  .catch((err) => {
    console.error('❌ Error conectando a MongoDB:', err.message);
    process.exit(1);
  });


app.use(errorLogger);
/*app.use(errors());*/


// Middleware de errores centralizado
app.use(errorHandler);
app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });