
const factory = require('./handlersFactory');
const Ad = require('../models/adModel');

// @desc      Get all adImages
// @route     GET /api/v1/adImages
// @access    Public
exports.getAd = factory.getAll(Ad);

// @desc      Get specific adImage by id
// @route     GET /api/v1/adImages/:id
// @access    Public
exports.getAd = factory.getOne(Ad);
// @desc      Create adImage
// @route     POST /api/v1/adImages
// @access    Private
exports.createAd = factory.createOne(Ad);

// @desc      Update adImage
// @route     PATCH /api/v1/adImages/:id
// @access    Private
exports.updateAd = factory.updateOne(Ad);

// @desc     Delete adImage
// @route    DELETE /api/v1/adImages/:id
// @access   Private
exports.deleteAdImage = factory.deleteOne(Ad);

exports.deleteAll = factory.deleteAll(Ad);
