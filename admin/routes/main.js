const express = require("express");
const User = require("../schema/addUser");
const router = express.Router();

router.get("/", async (req, res) => {
  let user;
  await User.find()
    .then((result) => {
      user = result;
    })
    .catch((err) => {
      console.log(err);
    });
  res.cookie("jwt", "", { maxAge: 1, httpOnly: true });
  res.render("main", { title: "Admin Panel", user });
});
// router.get();
module.exports = router;
