const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../schema/addUser");
const router = express.Router();

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

router.get("/admin/register", async (req, res) => {
  const register_toast = req.flash("register_toast");
  let userrole;
  await User.findOne({ Role: "Owner" })
    .then((result) => {
      userrole = result;
      // console.log(userrole);
    })
    .catch((err) => {
      console.log(err);
    });
  if (userrole) {
    res.redirect("/");
  } else {
    res.render("Register/register", { title: "Register", register_toast });
  }
});

router.post(
  "/admin/register",
  // Validating email and password
  [check("email").isEmail(), check("password").isLength({ min: 8 })],
  async (req, res) => {
    const { password, email, FullName } = req.body;
    // Hashing the Password
    let hashpass;
    const salt = await bcrypt.genSalt();
    hashpass = await bcrypt.hash(password, salt);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Failed Toast
      register_toast = {
        type: "danger",
        message: "Please Enter correct email and password atleast 8 digit",
      };
      req.flash("register_toast", register_toast);
      res.redirect("/admin/register");
    } else {
      // Saving User to DB
      const userDetail = new User({
        Name: FullName,
        Email: email,
        Password: hashpass,
        Role: "Owner",
      });
      await userDetail
        .save()
        .then((result) => {
          let owner = result;
          const token = createToken(owner._id);
          res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
          // res.json({ user: owner._id });
          console.log("SuccessFully");
          res.redirect("/admin/home");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
);
module.exports = router;
