const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth");
const app = express();
const PORT = process.env.PORT || 3000;
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require("cors");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const authRouter = require("./routes/auth");
const allowedOrigins = [
  'https://api.irlanda.chickenkiller.com',
  'https://irlanda.chickenkiller.com',
  'www.irlanda.chickenkiller.com', 
  'http://localhost:3000/',
  'http://irlanda.chickenkiller.com',
'http://api.irlanda.chickenkiller.com',
]

app.use((req, res, next) => {
  const { origin } = req.headers
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




app.use(express.json());


app.use(requestLogger);
app.use("/", authRouter);
app.use(auth);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Conexión a Mongo
const MONGO_URI = "mongodb://127.0.0.1:27017/aroundb19";
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB conectado");
  })
  .catch((err) => {
    console.error("❌ Error conectando a MongoDB:", err.message);
    process.exit(1);
  });

app.use(errorLogger);
/*app.use(errors());*/

// Middleware de errores centralizado
// app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
