const mongoose = require('mongoose');
const uniqueValidator = (property) => async function (value) {
    const query = {};
    query[property] = {$regex: new RegExp(`^${value}$`, "i")};

    // Ignore the id if this is an update.
    if (this._id) {
        query._id = {$ne: this._id};
    }

    try {
        const result = await mongoose.model('category_model').findOne(query).lean().exec();
        return !result;
    } catch (err) {
        debug(err);
        return false;
    }
};
//Attributes of the Course object
var categorySchema = new mongoose.Schema({
    catName: {
        type: String,
        validate: [
            {
                message: 'Category name must be unique.',
                validator: uniqueValidator('catName')
            }
        ]
    },
    pageTitle: {
        type: String
    },
    categoryTitle: {
        type: String
    },
    metaDescription: {
        type: String
    },
    catImages: {
        type: Array
    },
    shortDescription: {
        type: String
    },
    longDescription: {
        type: String
    },
    available: {
        type: Boolean
    },
    seoURL: {
        type: String   
    },
    startDate: {
        type: Date, default: Date.now
    },
    endDate: {
        type: Date, default: Date.now
    },
});
module.exports = mongoose.model('Category', categorySchema); 
