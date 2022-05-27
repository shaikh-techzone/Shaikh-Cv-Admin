// Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
// Importing Schema Model
const social = require("../../schema/addSocial");
const Userlogs = require("../../schema/addLog");
const { requireAuth } = require("../auth");
// Creating Router
const router = express.Router();
// Rendering View page
router.get("/viewsocial", requireAuth, async (req, res) => {
  // Toast Initialization
  const viewsocial_toast = req.flash("viewsocial_toast");
  let Social;
  await social
    .find()
    .then((result) => {
      Social = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("Social/viewsocial", {
    title: "View Social",
    Social,
    viewsocial_toast,
  });
});

// Deleting Social
router.get("/viewsocial/delete/:id", async (req, res) => {
  let id;
  id = req.params.id;
  const Logs = new Userlogs({
    User: "Shaikh Dev Inc.",
    Action: "Social Deleted",
  });
  social.findByIdAndDelete(id, async (err) => {
    if (err) {
      // Failed Toast
      viewsocial_toast = {
        type: "danger",
        message: "Social Failed to Delete!",
      };
      req.flash("viewsocial_toast", viewsocial_toast);
      throw err;
    } else {
      // Success Toast
      viewsocial_toast = {
        type: "success",
        message: "Social Deleted Successfully",
      };
      req.flash("viewsocial_toast", viewsocial_toast);
      await Logs.save();
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
  const Logs = new Userlogs({
    User: "Shaikh Dev Inc.",
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
      // Success Toast
      viewsocial_toast = {
        type: "success",
        message: "Social Updated Successfully!",
      };
      req.flash("viewsocial_toast", viewsocial_toast);
      await Logs.save();
      updatesocial = result;
      console.log("Updated");
      res.redirect("/viewsocial");
    })
    .catch((err) => {
      // Failed Toast
      viewsocial_toast = {
        type: "danger",
        message: "Social Failed To Update!",
      };
      req.flash("viewsocial_toast", viewsocial_toast);
      console.log(`Error`);
    });
});
// Exporting Router
module.exports = router;
