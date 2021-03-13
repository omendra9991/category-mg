const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    catName: {
        type: String,
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
