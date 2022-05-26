// const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../schema/addUser");
const router = express.Router();

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

router.get("/", (req, res) => {
  res.render("welcome", { title: "Welcome" });
});

router.get("/admin/login", (req, res) => {
  // const login_toast = req.flash('login_toast')
  res.render("Login/login", { title: "Login" });
});

router.post("/admin/login", async (req, res) => {
  let { email, password } = req.body;
  let user;
  user = await User.findOne({ email });
  console.log(user);
  if (user.Email === email) {
    const auth = await bcrypt.compare(password, user.Password);
    if (auth) {
      // return console.log("logged In");
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.redirect("/admin/home");
    } else {
      res.send("Incorrect Password");
    }
  } else {
    res.send("Incorrect Email");
  }
});

module.exports = router;
