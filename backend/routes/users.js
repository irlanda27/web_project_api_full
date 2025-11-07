const router = require('express').Router();
const { getCurrentUser, updateUser, updateAvatar} = require('../controllers/users');

// GET /users/me — datos del usuario actual (requiere auth)
router.get('/me', getCurrentUser);

router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
module.exports = router;