const express = require('express');
const promocodeController = require('../controllers/promocode-controller')
const router = express.Router();

router.get('/', promocodeController.findAll)
router.post('/delete', promocodeController.destroy);
router.post('/add', promocodeController.add);
router.post('/find', promocodeController.findByCode);

module.exports = router;