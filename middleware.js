const Restaurant = require('./model/restaurant');
const Review = require('./model/review')
const { restaurantSchema, reviewSchema } = require('./validationSchema');
const expressError = require('./utilities/expressError');



//確認登入狀態
module.exports.isLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('fail', '必須先登入！')
        return res.redirect('/login')
    } else {
        next();
    }
}

//輸入資料錯誤伺服器端 餐廳 驗證
module.exports.validateRestaurant = (req, res, next) => {
    const { error } = restaurantSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(msg, 400)
    } else {
        next();
    }
}

//輸入資料錯誤伺服器端 評論 驗證
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(msg, 400)
    } else {
        next();
    }
}

//確認使用者權限
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const Rest = await Restaurant.findById(id);
    if (!Rest.author.equals(req.user._id)) {
        req.flash('fail', '你沒有權限！');
        return res.redirect(`/restaurants/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('fail', '你沒有權限！');
        return res.redirect(`/restaurants/${id}`);
    }
    next();
}