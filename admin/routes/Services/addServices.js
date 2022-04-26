// Importing Libraries
const express = require("express");
// Importing Schema Model
const service = require("../../schema/addServices");
// Creating Router
const router = express.Router();
// Rendering Main Page
router.get("/addservices", (req, res) => {
  res.render("Services/addServices", { title: "Add Services" });
});
// Posting Data
router.post("/addservices", async (req, res) => {
  let ServiceName, ServiceDesc;
  ServiceName = req.body.ServiceName;
  ServiceDesc = req.body.ServiceDesc;

  const Service = new service({
    ServiceName,
    ServiceDesc,
  });
  await Service.save()
    .then((result) => {
      console.log("SuccessFully Saved");
      res.redirect("/addservices");
    })
    .catch((err) => {
      console.log("Failed to Save");
    });
});
// Exporting Router
module.exports = router;
