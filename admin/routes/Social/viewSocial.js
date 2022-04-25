const express = require("express");
const social = require("../../schema/addSocial");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/viewsocial", async (req, res) => {
  let Social;
  await social
    .find()
    .then((result) => {
      Social = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("Social/viewsocial", { title: "View Social", Social });
});

router.get("/viewsocial/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let action = { _id: id };
  social.deleteOne(action, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/viewsocial");
    }
  });
});
module.exports = router;
