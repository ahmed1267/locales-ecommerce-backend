const mongoose = require('mongoose');

const adSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            unique: [true, 'Brand must be unique'],
            minlength: [3, 'Too short brand name'],
            maxlength: [32, 'Too long brand name'],
        },
    },
    { timestamps: true }
);

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;