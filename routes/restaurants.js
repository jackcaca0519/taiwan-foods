const express = require('express')
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const { isLogin, validateRestaurant, isAuthor } = require('../middleware');
const restaurants = require('../controllers/restaurants');
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage })


// Index Of Restaurants
router.get('/', catchAsync(restaurants.index))
// Create Restaurant
router.get('/new', isLogin, restaurants.newFormPage)
router.post('/', isLogin, upload.array('image'), validateRestaurant, catchAsync(restaurants.newRestaurant))
// Show Specify Restaurant
router.get('/:id', catchAsync(restaurants.show))
// Edit Specify Restaurant
router.get('/:id/edit', isLogin, catchAsync(restaurants.editPage))
router.patch('/:id', isLogin, upload.array('image'), isAuthor, validateRestaurant, catchAsync(restaurants.editRestaurant))
//Delete Specify Restaurant
router.delete('/:id', isLogin, isAuthor, catchAsync(restaurants.delete))

router.get('/saving',)

module.exports = router;