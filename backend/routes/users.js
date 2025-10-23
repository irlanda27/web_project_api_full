const router = require('express').Router();
const { getCurrentUser } = require('../controllers/users');

// GET /users/me — datos del usuario actual (requiere auth)
router.get('/me', getCurrentUser);

module.exports = router;