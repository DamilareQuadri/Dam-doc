const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { diagnose, getHistory, retainCase } = require('../controllers/diagnosticController');
const auth = require('../middleware/auth');

router.post('/auth/register', register);
router.post('/auth/login', login);

router.post('/diagnose', auth, diagnose);
router.get('/history', auth, getHistory);
router.post('/retain', auth, retainCase);

module.exports = router;
