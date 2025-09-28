const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const { createUser, login, getCurrentUser } = require('./controllers/users');


const app = express();
const PORT = 3000;

app.use(express.json());


app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.get('/users/me', getCurrentUser);

mongoose.connect('mongodb://127.0.0.1:27017/aroundb19')
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