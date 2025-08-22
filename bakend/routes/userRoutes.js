const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/auth');
const allowRoles = require('../middlewares/role');

router.get('/stats', verifyToken, allowRoles('admin'), userController.getDashboardStats);

// GET /api/users → admin only
router.get('/', verifyToken, allowRoles('admin'), userController.getAllUsers);

// admin can add store owner 
router.post('/create-store-owner', verifyToken, allowRoles('admin'), userController.createStoreOwner);


// Authenticated user updates own password
router.put('/me', verifyToken, userController.updatePassword);


module.exports = router;
