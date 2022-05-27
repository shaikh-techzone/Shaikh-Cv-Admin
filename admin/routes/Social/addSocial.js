// Importing Libraries
const express = require("express");
// Importing Schema Model
const social = require("../../schema/addSocial");
const Userlogs = require("../../schema/addLog");
const { requireAuth } = require("../auth");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/addsocial", requireAuth, async (req, res) => {
  // Toast Initialization
  const social_toast = req.flash("social_toast");
  let Social;
  await social
    .find()
    .then((result) => {
      Social = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("Social/addSocial", { title: "Add Social", Social, social_toast });
});
// Posting Data
router.post("/addsocial", async (req, res) => {
  let Facebook, Instagram, LinkedIn, Github;
  Facebook = req.body.Facebook;
  Instagram = req.body.Instagram;
  LinkedIn = req.body.LinkedIn;
  Github = req.body.Github;

  const Social = new social({
    Facebook,
    Instagram,
    LinkedIn,
    Github,
  });
  const Logs = new Userlogs({
    User: "Shaikh Dev Inc.",
    Action: "Social Added",
  });
  await Social.save()
    .then(async (result) => {
      // Success Toast
      social_toast = {
        type: "success",
        message: "Social Created Successfully!",
      };
      req.flash("social_toast", social_toast);
      await Logs.save();
      console.log("SuccessFully Saved");
      res.redirect("/addsocial");
    })
    .catch((err) => {
      // Failed Toast
      social_toast = {
        type: "danger",
        message: "Social Creation Failed!",
      };
      req.flash("social_toast", social_toast);
      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
