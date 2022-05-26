const express = require("express");
// Auth
const { requireAuth } = require("./auth");
const router = express.Router();

router.get("/admin", requireAuth, (req, res) => {
  res.render("main", { title: "Admin Panel" });
});
// router.get();
module.exports = router;
