const express = require("express");
const {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getJobCount,
    getJobsByCompany

} = require("../controllers/PostedJob.controller"); // Importing the job controller

const router = express.Router();

// Route to create a new job
router.post("/create", createJob);

// Route to get all jobs
router.get("/getAll", getAllJobs);

router.get("/count", getJobCount);

// Route to get a job by ID
router.get("/get/:id", getJobById);

// Route to update a job by ID
router.put("/update/:id", updateJob);

// Route to delete a job by ID
router.delete("/delete/:id", deleteJob);

router.get('/organization/:compId/jobs', getJobsByCompany);

module.exports = router;
