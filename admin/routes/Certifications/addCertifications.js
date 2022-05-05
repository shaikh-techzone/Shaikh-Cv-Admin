// Importing Libraries
const express = require("express");
// Importing Schema Model
const certifications = require("../../schema/addCertifications");
const Userlogs = require("../../schema/addLog");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/admin/addcertifications", (req, res) => {
  res.render("Certifications/addCertifications", {
    title: "Add Certifications",
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
      await Logs.save();
      console.log("SuccessFully Saved");
      res.redirect("/admin/addcertifications");
    })
    .catch((err) => {
      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
