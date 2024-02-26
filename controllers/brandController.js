const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/imageUpload');
const Brand = require('../models/brandModel');

exports.uploadBrandImage = uploadSingleImage('image');

// Resize image
exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();
  const filePath = path.join(`__dirname, ../uploads/brands/${filename}`);
  // req.file.filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  const ext = req.file.mimetype.split('/')[1];
  const filename = `brand-${uuidv4()}-${Date.now()}.${ext}`;

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

// @desc      Get all brands
// @route     GET /api/v1/brands
// @access    Public
exports.getBrands = factory.getAll(Brand);

// @desc      Get specific brand by id
// @route     GET /api/v1/brands/:id
// @access    Public
exports.getBrand = factory.getOne(Brand);
// @desc      Create brand
// @route     POST /api/v1/brands
// @access    Private
exports.createBrand = factory.createOne(Brand);

// @desc      Update brand
// @route     PATCH /api/v1/brands/:id
// @access    Private
exports.updateBrand = factory.updateOne(Brand);

// @desc     Delete brand
// @route    DELETE /api/v1/brands/:id
// @access   Private
exports.deleteBrand = factory.deleteOne(Brand);

exports.deleteAll = factory.deleteAll(Brand);
