const { cloudinary } = require('../cloudinary');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mbxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mbxToken });
const Restaurant = require('../model/restaurant');
const Review = require('../model/review');


module.exports.index = async (req, res) => {
    const restaurants = await Restaurant.find({});
    res.render('restaurants/index', { restaurants });
}

module.exports.newFormPage = (req, res) => {
    res.render('restaurants/new');
}

module.exports.newRestaurant = async (req, res) => {
    const geodata = await geocoder.forwardGeocode({
        query: req.body.restaurant.location,
        limit: 1
    }).send()
    //資料上傳資料庫
    const rest = new Restaurant(req.body.restaurant);
    rest.geometry = geodata.body.features[0].geometry;
    rest.images = req.files.map(file => ({ url: file.path, filename: file.filename }));
    rest.author = req.user._id;
    await rest.save();
    req.flash('success', '成功創建新餐廳');
    res.redirect(`/restaurants/${rest._id}`);
}

module.exports.show = async (req, res) => {
    const rest = await Restaurant.findById(req.params.id).populate({
        path: 'reviews',
        populate: 'author'
    }).populate('author');
    if (!rest) {
        req.flash('fail', '找不到餐廳');
        res.redirect(`/restaurants`);
    }
    res.render('restaurants/show', { rest });
}

module.exports.editPage = async (req, res) => {
    const rest = await Restaurant.findById(req.params.id);
    if (!rest) {
        req.flash('fail', '找不到餐廳');
        res.redirect(`/restaurants`);
    }
    res.render('restaurants/edit', { rest });
}

module.exports.editRestaurant = async (req, res) => {
    const { id } = req.params;
    const rest = await Restaurant.findByIdAndUpdate(id, { ...req.body.restaurant });
    const imgs = req.files.map(file => ({ url: file.path, filename: file.filename }));
    rest.images.push(...imgs);
    await rest.save();
    if (req.body.deleteImg) {
        for (let file of req.body.deleteImg) {
            await cloudinary.uploader.destroy(file);
        }
        await rest.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImg } } } });
    }
    req.flash('success', '成功更新餐廳');
    res.redirect(`/restaurants/${id}`);
}

module.exports.delete = async (req, res) => {
    const yes = alert("確定刪除？");
    if (yes) {
        await Restaurant.findByIdAndDelete(req.params.id);
        req.flash('fail', '成功刪除餐廳');
        res.redirect('/restaurants');
    } else {
        res.redirect(`/restaurants/${req.params.id}`);
    }

}

