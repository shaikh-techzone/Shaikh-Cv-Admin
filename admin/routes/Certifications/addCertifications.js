// Importing Libraries
const express = require("express");
// Importing Schema Model
const certifications = require("../../schema/addCertifications");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/admin/addcertifications", (req, res) => {
  // Toast Initialization
  const certificate_toast = req.flash("certificate_toast");
  res.render("Certifications/addCertifications", {
    title: "Add Certifications",
    certificate_toast,
  });
});
// Posting Data
router.post("/admin/addcertifications", async (req, res) => {
  let Name, Issuer, IssueYear, Desc;
  Name = req.body.CertificationName;
  Issuer = req.body.Issuer;
  IssueYear = req.body.IssueYear;
  Desc = req.body.Desc;

  const Certifications = new certifications({
    Name,
    Issuer,
    IssueYear,
    Desc,
  });
  const Logs = new Userlogs({
    User: "Shaikh Admin",
    Action: "Certification Added",
  });
  await Certifications.save()
    .then(async (result) => {
      // Success Toast
      certificate_toast = {
        type: "success",
        message: "Certification Created Successfully!",
      };
      req.flash("certificate_toast", certificate_toast);
      await Logs.save();
      console.log("SuccessFully Saved");
      res.redirect("/admin/addcertifications");
    })
    .catch((err) => {
      // Failed Toast
      certificate_toast = {
        type: "danger",
        message: "Certification Creation Failed!",
      };
      req.flash("certificate_toast", certificate_toast);
      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
