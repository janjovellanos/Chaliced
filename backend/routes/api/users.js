// backend/routes/api/users.js
const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Review, Product } = require("../../db/models");
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
  res.json(reviews)
})




//================== Sign up ==========================//
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });

  await setTokenCookie(res, user);

  return res.json({
    user
  });
});
//
//
//
module.exports = router;
