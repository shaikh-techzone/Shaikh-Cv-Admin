// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const social = require("../../schema/addSocial");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering View page
router.get("/admin/viewsocial", async (req, res) => {
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
router.get("/admin/viewsocial/delete/:id", async (req, res) => {
  let id;
  id = req.params.id;
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "Social Deleted",
  });
  social.findByIdAndDelete(id, async (err) => {
    if (err) {
      throw err;
    } else {
      await Logs.save();
      res.redirect("/admin/viewsocial");
    }
  });
});
// Finding Social by ID
router.get("/admin/viewsocial/edit/:id", async (req, res) => {
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
router.post("/admin/viewsocial/edit/:id", async (req, res) => {
  let id;
  id = req.params.id;
  let updatesocial;
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "Social Updated",
  });
  await social
    .findByIdAndUpdate(id, {
      Facebook: req.body.Facebook,
      Instagram: req.body.Instagram,
      LinkedIn: req.body.LinkedIn,
      Github: req.body.Github,
    })
    .then(async (result) => {
      await Logs.save();
      updatesocial = result;
      console.log("Updated");
      res.redirect("/admin/viewsocial");
    })
    .catch((err) => {
      console.log(`Error`);
    });
});
// Exporting Router
module.exports = router;
