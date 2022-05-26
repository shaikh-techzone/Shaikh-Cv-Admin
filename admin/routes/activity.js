const express = require("express");
const mongoose = require("mongoose");
const logs = require("../schema/addLog");
const { requireAuth } = require("./auth");
const router = express.Router();

router.get("/admin/activity", requireAuth, async (req, res) => {
  let Logs;
  await logs
    .find()
    .then((result) => {
      Logs = result;
    })
    .catch((err) => {
      console.log(`Error`);
    });
  res.render("Activity/activity", { title: "User Log", Logs });
});
module.exports = router;
