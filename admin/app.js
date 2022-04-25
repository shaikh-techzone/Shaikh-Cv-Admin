//Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//Importing Components
const home = require("./routes/home");
const main = require("./routes/main");
const addServices = require("./routes/Services/addServices");
const viewServices = require("./routes/Services/viewServices");
const addBioData = require("./routes/BioData/addBioData");
const viewBioData = require("./routes/BioData/viewBioData");
const addCertifications = require("./routes/Certifications/addCertifications");
const viewCertifications = require("./routes/Certifications/viewCertifications");
const addEducation = require("./routes/Education/addEducation");
const viewEducation = require("./routes/Education/viewEducation");
const addExperience = require("./routes/Experience/addExperience");
const viewExperience = require("./routes/Experience/viewExperience");
const addSkills = require("./routes/Skills/addSkills");
const viewSkills = require("./routes/Skills/viewSkills");
const addTestimonials = require("./routes/Testimonials/addTestimonials");
const viewTestimonials = require("./routes/Testimonials/viewTestimonials");
const addSocial = require("./routes/Social/addSocial");
const viewSocial = require("./routes/Social/viewSocial");

//Creating Server
const app = express();
//Defining Port
const port = 5000 || process.env.port;
//Setting Templating View Engine
app.set("view engine", "ejs");
//app.set("views", "views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//DB Connection URI
const dbCon =
  "mongodb+srv://Root:sami2003@cluster0.d1uxe.mongodb.net/Project1?retryWrites=true&w=majority";
//Connecting DB with Server
mongoose
  .connect(dbCon)
  .then((result) => {
    app.listen(port, () => {
      console.log(
        `Server Has Been Started on ${port} & DB is Connected Successfully`
      );
    });
  })
  .catch((err) => {
    console.log(`DB Connection Error ${err}`);
  });
//Using routes
app.use("/", main);
app.use("/", home);
app.use("/", addServices);
app.use("/", viewServices);
app.use("/", addBioData);
app.use("/", viewBioData);
app.use("/", addCertifications);
app.use("/", viewCertifications);
app.use("/", addEducation);
app.use("/", viewEducation);
app.use("/", addExperience);
app.use("/", viewExperience);
app.use("/", addSkills);
app.use("/", viewSkills);
app.use("/", addTestimonials);
app.use("/", viewTestimonials);
app.use("/", addSocial);
app.use("/", viewSocial);
