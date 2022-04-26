// Importing Libraries
const express = require("express");
// Importing Schema Model
const social = require("../../schema/addSocial");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/addsocial", (req, res) => {
  res.render("Social/addSocial", { title: "Add Social" });
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
  await Social.save()
    .then((result) => {
      console.log("SuccessFully Saved");
      res.redirect("/addsocial");
    })
    .catch((err) => {
      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
