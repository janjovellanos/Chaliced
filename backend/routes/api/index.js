const router = require("express").Router();
//
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const productRouter = require("./products.js");
const reviewRouter = require("./reviews.js");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/products", productRouter);
router.use("/reviews", reviewRouter)

// router.post("/test", (req, res) => {
//   res.json({ requestBody: req.body });
// });

//=============== Test Routes ============================//
// // GET /api/set-token-cookie
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
router.get("/set-token-cookie", async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: "Demo-lition"
    }
  });
  setTokenCookie(res, user);
  return res.json({ user });
});

// GET current user
const { restoreUser } = require("../../utils/auth.js");
router.get("/restore-user", restoreUser, (req, res) => {
  return res.json(req.user);
});

// GET /api/require-auth
const { requireAuth } = require("../../utils/auth.js");
router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});
//
//
//
module.exports = router;
