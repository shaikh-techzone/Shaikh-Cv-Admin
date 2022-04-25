const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.render("index", { title: "Home" });
});
module.exports = router;
