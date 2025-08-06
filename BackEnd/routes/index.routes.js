const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth",require("./auth.routes"));
router.use("/posts",require("./post.routes"));

module.exports = router;
