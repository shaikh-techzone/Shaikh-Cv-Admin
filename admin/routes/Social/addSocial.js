// Importing Libraries
const express = require("express");
// Importing Schema Model
const social = require("../../schema/addSocial");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/admin/addsocial", async (req, res) => {
  let Social;
  await social
    .find()
    .then((result) => {
      Social = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("Social/addSocial", { title: "Add Social", Social });
});
// Posting Data
router.post("/admin/addsocial", async (req, res) => {
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
    User: "Shaikh Admin",
    Action: "Social Added",
  });
  await Social.save()
    .then(async (result) => {
      await Logs.save();
      console.log("SuccessFully Saved");
      res.redirect("/admin/addsocial");
    })
    .catch((err) => {
      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
