const express = require('express');
const {
    getad,
    createAd,
    getAd,
    updateAd,
    deleteAd,
    deleteAll,
} = require('../controllers/adController');

const authController = require('../controllers/authController');
const { getAd } = require('../controllers/adController');

const router = express.Router();

router
    .route('/')
    .get(getAd)
    .post(
        authController.auth,
        authController.allowedTo('admin', 'manager'),
        createAd
    )
    .delete(deleteAll);

// router.use(idValidation);
router
    .route('/:id')
    .get(getAdValidator, getAd)
    .put(
        authController.auth,
        authController.allowedTo('admin', 'manager'),
        updateAd
    )
    .delete(
        authController.auth,
        authController.allowedTo('admin'),
        deleteAd
    );

module.exports = router;
