const mongoose = require('mongoose');

const adImageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            unique: [true, 'AdImage title must be unique'],
            minlength: [3, 'Too short AdImage title'],
            maxlength: [32, 'Too long AdImage title'],
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

const setImageUrl = (doc) => {
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/adImage/${doc.image}`;
        doc.image = imageUrl;
    }
};

adImageSchema.post('init', (doc) => {
    setImageUrl(doc);
});

adImageSchema.post('save', (doc) => {
    setImageUrl(doc);
});

const AdImage = mongoose.model('AdImage', adImageSchema);

module.exports = AdImage;