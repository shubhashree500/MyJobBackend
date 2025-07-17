const express = require("express");
const router = express.Router();
const {
  applyJob,
  getAppliedJobs,
  withdrawApplication, // ✅ Import
} = require("../controllers/jobApplication.controller");
const { isAuthenticated } = require("../middlewares/authenticate");

router.post("/apply-job", isAuthenticated, applyJob);
router.get("/applied-jobs", isAuthenticated, getAppliedJobs);
router.delete("/withdraw/:id", isAuthenticated, withdrawApplication);

module.exports = router;
