const joi = require('joi');
module.exports.restaurantSchema = joi.object({
    restaurant: joi.object({
        title: joi.string().required(),
        location: joi.string().required(),
        avgPrice: joi.number().required().min(0),
        description: joi.string(),
        //image: joi.string().required(),
    }).required(),
    deleteImg: joi.array()
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        text: joi.string().required(),
        rating: joi.number().required()
    }).required()
});
