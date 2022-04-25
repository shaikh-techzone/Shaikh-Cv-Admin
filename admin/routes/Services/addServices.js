const express = require("express");
const service = require("../../schema/addServices");
const router = express.Router();

router.get("/addservices", (req, res) => {
  res.render("Services/addServices", { title: "Add Services" });
});

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

module.exports = router;
