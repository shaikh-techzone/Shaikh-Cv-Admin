const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("main", { title: "Admin Panel" });
});
module.exports = router;
