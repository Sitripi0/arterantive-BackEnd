const express = require("express");
const router = express.Router();
const mongoose = require ("mongoose")

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
//GET /api/health
router.get('/health', (req, res) => {
  // send ping to prevent inactivity on mongodb atlas
  mongoose.connection.db.admin().ping()
    .then( () => {
      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString()
      });
    })
    .catch(err => {
      console.error('MongoDB ping failed:', err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to connect to MongoDB',
      });
    });
});


router.use("/auth",require("./auth.routes"));
router.use("/",require("./post.routes"));
router.use("/",require("./comment.routes"));

module.exports = router;
