const express = require('express')
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/catchAsync');
const { isLogin, isReviewAuthor, validateReview } = require('../middleware');
const reviews = require('../controllers/reviews')



//Create Reviews
router.post('/', isLogin, validateReview, catchAsync(reviews.create))
//Delete Specify Review
router.delete('/:reviewId', isLogin, isReviewAuthor, catchAsync(reviews.delete))

module.exports = router;