const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/imageUpload');
const AdImage = require('../models/adImageModel');

exports.uploadAdImageImage = uploadSingleImage('image');

// Resize image
exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();
  const filePath = path.join(`__dirname, ../uploads/adImages/${filename}`);
  // req.file.filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  const ext = req.file.mimetype.split('/')[1];
  const filename = `adImage-${uuidv4()}-${Date.now()}.${ext}`;

  fs.writeFile(filePath, req.file.buffer, (err) => {
    if (err) {
      console.error('Error saving file:', err);
      return next(err);
    }
    console.log('File saved successfully.');

  })
  req.body.image = filename;
  console.log(filename);
  req.body.image = filename;
  next();
});

// @desc      Get all adImages
// @route     GET /api/v1/adImages
// @access    Public
exports.getAdImages = factory.getAll(AdImage);

// @desc      Get specific adImage by id
// @route     GET /api/v1/adImages/:id
// @access    Public
exports.getAdImage = factory.getOne(AdImage);
// @desc      Create adImage
// @route     POST /api/v1/adImages
// @access    Private
exports.createAdImage = factory.createOne(AdImage);

// @desc      Update adImage
// @route     PATCH /api/v1/adImages/:id
// @access    Private
exports.updateAdImage = factory.updateOne(AdImage);

// @desc     Delete adImage
// @route    DELETE /api/v1/adImages/:id
// @access   Private
exports.deleteAdImage = factory.deleteOne(AdImage);

exports.deleteAll = factory.deleteAll(AdImage);
