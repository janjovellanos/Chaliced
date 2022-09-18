// backend/routes/api/users.js
const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Review, Product, Image } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

//
// =====================================================
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors
];
//=======================================================

//get all reviews of a specified user
router.get("/:userId/reviews", requireAuth, async (req, res, next) => {
  const { userId } = req.params;

  const reviews = await Review.findAll({
    where: { sellerId: +userId },
    include: [
        {
            model: Product, attributes: ['id', 'name', 'size', 'price']
        }
    ]
  });

  if (reviews) {
    res.json(reviews)
  } else {
    const err = new Error("This user has no reviews");
    err.status = 404;
    err.title = "This user has no reviews";
    return next(err);
  }

});

//get all products of a specified user
router.get("/:userId/products", requireAuth, async (req, res, next) => {
  const { userId } = req.params;

  const products = await Product.findAll({
    where: { userId: +userId },
    include: [
        {
            model: Image, attributes: ['id', 'productId', 'url']
        }
    ]
  });

  if (products) {
    res.json(products)
  } else {
    const err = new Error("This user has no products for sale");
    err.status = 404;
    err.title = "This user has no products for sale";
    return next(err);
  }

});

//get all details of a specified user
router.get("/:userId", requireAuth, async (req, res, next) => {
  const { userId } = req.params;

  const seller = await User.findByPk(userId, {
    include: [
        {
            model: Product, attributes: ['id', 'userId', 'name']
        },
        {
          model: Review, attributes: ['id', 'sellerId', 'body', 'stars']
      }
    ]
  });

  if (seller) {
    res.json(seller)
  } else {
    const err = new Error("Seller couldn't be found");
    err.status = 404;
    err.title = "Seller couldn't be found";
    return next(err);
  }

});




//================== Sign up ==========================//
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ username, firstName, lastName, email, password, address, bio, profileImage });

  await setTokenCookie(res, user);

  return res.json({
    user
  });
});
//
//
//
module.exports = router;
