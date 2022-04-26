// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const social = require("../../schema/addSocial");
// Creating Router
const router = express.Router();
// Rendering View page
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

// Deleting Social
router.get("/viewsocial/delete/:id", async (req, res) => {
  let id;
  id = req.params.id;
  social.findByIdAndDelete(id, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/viewsocial");
    }
  });
});
// Finding Social by ID
router.get("/viewsocial/edit/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let Social;
  await social
    .findById(id)
    .then((result) => {
      Social = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });

  res.render("Social/updateSocial", { title: "Edit Social", Social });
});
// Updating Social By Id
router.post("/viewsocial/edit/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let updatesocial;
  await social
    .findByIdAndUpdate(id, {
      Facebook: req.body.Facebook,
      Instagram: req.body.Instagram,
      LinkedIn: req.body.LinkedIn,
      Github: req.body.Github,
    })
    .then((result) => {
      updatesocial = result;
      console.log("Updated");
      res.redirect("/viewsocial");
    })
    .catch((err) => {
      console.log(`Error`);
    });
});
// Exporting Router
module.exports = router;
