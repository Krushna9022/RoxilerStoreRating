const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const verifyToken = require('../middlewares/auth');
const allowRoles = require('../middlewares/role');

// User can submit a new rating
router.post('/', verifyToken, allowRoles('user'), ratingController.submitRating);

// User can update their rating
router.put('/:id', verifyToken, allowRoles('user'), ratingController.updateRating);

//view rating for owner mens can view the rating and user 
router.get('/owner', verifyToken, allowRoles('store_owner'), ratingController.getRatingsForOwner);

module.exports = router;
