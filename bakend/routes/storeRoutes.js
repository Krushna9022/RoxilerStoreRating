const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const verifyToken = require('../middlewares/auth');
const allowRoles = require('../middlewares/role');

// Add a new store
router.post('/', verifyToken, allowRoles('admin'), storeController.addStore);

// Get all stores (with filters and average ratings)
router.get('/', verifyToken, allowRoles('admin'), storeController.getAllStores);

//  Public listing for all authenticated users
router.get('/list', verifyToken, storeController.listStores);

module.exports = router;
