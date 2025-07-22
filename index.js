require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const sequelize = require("./config/db.config");
const setupAssociations = require("./models/associations");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 6011;

// ✅ Load Models First
require("./models/organization.details.model");
require("./models/PostedJob.model");
require("./models/SavedJob.model");
require('./models/associations');

// ✅ Setup Associations (MUST BE CALLED)
// setupAssociations();

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/photo", express.static(path.join(__dirname, "./uploads/companyLogos")));
app.use("/api/v1/userlogo", express.static(path.join(__dirname, "./uploads/userLogos")));

// Basic Routes
app
  .get("/", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "public/templates", "index.html"));
  })
  .post("/", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "public/templates", "index.html"));
  });

// API Routes
app.use("/api/v1/personalDetails", require("./routes/PersonalDetails.routes"));
app.use("/api/v1/professionalDetails", require("./routes/ProfessionalDetails.routes"));
app.use("/api/v1/requestApplication", require("./routes/RequestApplication.routes"));
app.use("/api/v1/organizationDetails", require("./routes/OrganizationDetails.routes"));
app.use("/api/v1/postedjob", require("./routes/PostedJob.routes"));
app.use("/api/v1/admin", require("./routes/Admin.routes"));
app.use("/api/v1/savedjob", require("./routes/SavedJob.routes"));
app.use("/api/v1/jobApplication", require("./routes/jobApplication.routes"));
app.use('/public', express.static('public'));

// DB Connection
const initiateConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    console.log("✅ Database connected successfully.");
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

initiateConnection();
