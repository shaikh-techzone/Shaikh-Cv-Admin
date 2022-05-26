const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../schema/addUser");
const router = express.Router();

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

router.get("/admin/register", async (req, res) => {
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
    res.redirect("/admin/login");
  } else {
    res.render("Register/register", { title: "Register" });
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
      res.send("Error!!!!");
    }
    // Saving User to DB
    let user;
    await User.findOne({ email })
      .then((result) => {
        user = result;
      })
      .catch((err) => {
        console.log(err);
      });
    if (user) {
      res.send("User Exists");
    } else {
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
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
);
module.exports = router;
