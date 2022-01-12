const { string } = require('joi');
const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const imgSchema = new Schema({
    url: String,
    filename: String
});

imgSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opt = { toJSON: { virtuals: true } };

const resSchema = new Schema({
    title: String,
    avgPrice: Number,
    description: String,
    location: String,
    images: [imgSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, opt);

resSchema.virtual('properties.popUpMarkup').get(function () {
    return `<a href=/restaurants/${this._id}>${this.title}</a>`;
});

resSchema.post('findOneAndDelete', async function (rest) {
    if (rest.reviews) {
        await Review.deleteMany({
            _id: {
                $in: rest.reviews
            }
        });
    }
    if (rest.images) {
        for (img of rest.images) {
            await cloudinary.uploader.destroy(img.filename)
        }
    }
})

module.exports = mongoose.model('Restaurant', resSchema);