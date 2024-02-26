const express = require('express');
const {
    createAdImage,
    getAdImage,
    updateAdImage,
    deleteAdImage,
    uploadAdImageImage,
    resizeImage,
    deleteAll,
} = require('../controllers/adImageController');

const authController = require('../controllers/authController');
const { getAdImage } = require('../controllers/adImageController');

const router = express.Router();

router
    .route('/')
    .get(getAdImage)
    .post(
        authController.auth,
        authController.allowedTo('admin', 'manager'),
        uploadAdImageImage,
        resizeImage,
        createAdImage
    )
    .delete(deleteAll);

// router.use(idValidation);
router
    .route('/:id')
    .get(getBrandValidator, getAdImage)
    .put(
        authController.auth,
        authController.allowedTo('admin', 'manager'),
        uploadAdImageImage,
        resizeImage,
        updateAdImage
    )
    .delete(
        authController.auth,
        authController.allowedTo('admin'),
        deleteAdImage
    );

module.exports = router;
