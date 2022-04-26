//Importing Libraries
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//Importing Components
const home = require("./routes/home");
const main = require("./routes/main");
// Services Routes
const addServices = require("./routes/Services/addServices");
const viewServices = require("./routes/Services/viewServices");
// Bio Data Routes
const addBioData = require("./routes/BioData/addBioData");
const viewBioData = require("./routes/BioData/viewBioData");
// Certifications Routes
const addCertifications = require("./routes/Certifications/addCertifications");
const viewCertifications = require("./routes/Certifications/viewCertifications");
// Education Routes
const addEducation = require("./routes/Education/addEducation");
const viewEducation = require("./routes/Education/viewEducation");
// Experience Routes
const addExperience = require("./routes/Experience/addExperience");
const viewExperience = require("./routes/Experience/viewExperience");
// Skills Routes
const addSkills = require("./routes/Skills/addSkills");
const viewSkills = require("./routes/Skills/viewSkills");
// Testimonials Routes
const addTestimonials = require("./routes/Testimonials/addTestimonials");
const viewTestimonials = require("./routes/Testimonials/viewTestimonials");
// Social Routes
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
// Using Services Routes
app.use("/", addServices);
app.use("/", viewServices);
// Using Bio Data Routes
app.use("/", addBioData);
app.use("/", viewBioData);
// Using Certifications Routes
app.use("/", addCertifications);
app.use("/", viewCertifications);
// Using Education Routes
app.use("/", addEducation);
app.use("/", viewEducation);
// Using Experience Routes
app.use("/", addExperience);
app.use("/", viewExperience);
// Using Skills Routes
app.use("/", addSkills);
app.use("/", viewSkills);
// Using Testimonials Routes
app.use("/", addTestimonials);
app.use("/", viewTestimonials);
// Using Social Routes
app.use("/", addSocial);
app.use("/", viewSocial);
