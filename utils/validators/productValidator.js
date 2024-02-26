const slugify = require('slugify');
const { check, body } = require('express-validator');

const {
  validatorMiddleware,
} = require('../../middlewares/validatorMiddleware');
const Category = require('../../models/categoryModel');
const SubCategory = require('../../models/subCategoryModel');

// check() => check check and params etc
exports.createProductValidator = [
  check('title')
    .isLength({ min: 3 })
    .withMessage(("3 chars"))
    .notEmpty()
    .withMessage(("product required"))
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check('description')
    .notEmpty()
    .withMessage(('product description is required'))
    .isLength({ max: 2000 })
    .withMessage(('Too long description')),

  check('quantity')
    .notEmpty()
    .withMessage(('product quantity is required'))
    .isNumeric()
    .withMessage(('product quantity must be a number')),

  check('sold')
    .optional()
    .isNumeric()
    .withMessage(('product quantity must be a number')),

  check('price')
    .notEmpty()
    .withMessage(('product price is required'))
    .isNumeric()
    .withMessage(('product price must be a number'))
    .isLength({ max: 32 })
    .withMessage(("product price too long")),

  check('priceAfterDiscount')
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage(("Product priceAfterDiscount must be a number"))
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error(("priceAfterDiscount must be lower than price"));
      }
      return true;
    }),

  check('availableColors').optional().toArray(),
  // check('imageCover').notEmpty().withMessage('Product imageCover is required'),
  check('images')
    .optional()
    .toArray()
    .isArray()
    .withMessage(("images should be array of string")),
  // 1- check if category exist in our db
  check('category')
    .notEmpty()
    .withMessage(('Product must be belong to a category'))
    .isMongoId()
    .withMessage(("Invalid ID formate"))
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(("No category exist for this id: ") + `${categoryId}`)
          );
        }
      })
    ),
  // 2- Check if subcategories exist in our db
  // 3- check if subcategories belong to category
  check('subcategory')
    .optional()
    .toArray()
    .custom((subcategoriesIds) =>
      SubCategory.find({
        _id: { $exists: true, $in: subcategoriesIds },
      }).then((results) => {
        if (results.length < 1 || subcategoriesIds.length !== results.length) {
          console.log(results);
          return Promise.reject(new Error(("Invalid subcategories Ids")));
        }
      })
    )
    .custom((val, { req }) =>
      SubCategory.find({
        category: req.body.category,
      }).then((subcategories) => {
        // check if subcategories in body the same subcategories in category
        const subIdsInDB = [];
        subcategories.forEach((subcategory) => {
          subIdsInDB.push(subcategory._id.toString());
        });
        const checker = (arr, target) => target.every((t) => arr.includes(t));
        // console.log(checker(subIdsInDB, val));
        if (!checker(subIdsInDB, val)) {
          return Promise.reject(
            new Error((('Subcategory not belong to category')))
          );
        }
      })
    ),

  check('brand').optional().isMongoId().withMessage(("Invalid ID formate")),

  check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage(("ratings average must be a number"))
    .isLength({ min: 1 })
    .withMessage(("rating must be above or equal to 1"))
    .isLength({ max: 5 })
    .withMessage(("rating must be below or equal to 5")),

  check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage(("ratings quantity is required")),

  validatorMiddleware,
];

exports.getProductValidator = [
  check('id').isMongoId().withMessage(("Invalid ID formate")),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check('id').isMongoId().withMessage(("Invalid ID formate")),
  body('title')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check('id').isMongoId().withMessage(("Invalid ID formate")),
  validatorMiddleware,
];
