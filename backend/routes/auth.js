const express = require('express');
const router = express.Router();
const {createUser, login}=require('../controllers/auth.js');

// Rutas públicas con validación
router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;