const express = require("express");
const certifications = require("../../schema/addCertifications");
const router = express.Router();

router.get("/addcertifications", (req, res) => {
  res.render("Certifications/addCertifications", {
    title: "Add Certifications",
  });
});

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

module.exports = router;
