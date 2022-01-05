const Restaurant = require('../model/restaurant');
const Review = require('../model/review');




module.exports.create = async (req, res) => {
    const rest = await Restaurant.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    rest.reviews.push(review);
    await review.save();
    await rest.save();
    req.flash('success', '成功建立評論');
    res.redirect(`/restaurants/${rest._id}`);
}

module.exports.delete = async (req, res) => {
    const { id, reviewId } = req.params;
    await Restaurant.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('fail', '成功刪除一則評論');
    res.redirect(`/restaurants/${id}`);
}