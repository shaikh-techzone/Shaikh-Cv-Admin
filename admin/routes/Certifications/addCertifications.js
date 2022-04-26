// Importing Libraries
const express = require("express");
// Importing Schema Model
const certifications = require("../../schema/addCertifications");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/addcertifications", (req, res) => {
  res.render("Certifications/addCertifications", {
    title: "Add Certifications",
  });
});
// Posting Data
router.post("/addcertifications", async (req, res) => {
  let Name, Issuer, IssueDate;
  Name = req.body.CertificationName;
  Issuer = req.body.Issuer;
  IssueDate = req.body.IssueDate;

  const Certifications = new certifications({
    Name,
    Issuer,
    IssueDate,
  });
  await Certifications.save()
    .then((result) => {
      console.log("SuccessFully Saved");
      res.redirect("/addcertifications");
    })
    .catch((err) => {
      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
