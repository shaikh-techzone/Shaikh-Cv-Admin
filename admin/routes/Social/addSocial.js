const express = require("express");
const social = require("../../schema/addSocial");
const router = express.Router();

router.get("/addsocial", (req, res) => {
  res.render("Social/addSocial", { title: "Add Social" });
});

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

module.exports = router;