const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const auth = require('../middleware/auth');

router.get('/', auth, emailController.getInbox);
router.get('/:id', auth, emailController.getEmail);
router.post('/send', auth, emailController.sendEmail);
router.delete('/:id', auth, emailController.deleteEmail);

module.exports = router;
