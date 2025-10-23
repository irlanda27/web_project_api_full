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
app.use(cors());



// Middleware de autorización
app.use(auth);
app.use('/users', usersRouter);
/*app.use(cardsRouter);*/
app.use('/', authRouter);

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
/*app.use(errors());*/


// Middleware de errores centralizado
app.use(errorHandler);