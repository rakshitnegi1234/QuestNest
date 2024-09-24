const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must be at most 5'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    author:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
