const { v4: uuidv4 } = require('uuid');
const { Sequelize, Op } = require('sequelize');
const sequelize = require("../config/db.config");
const PostedJob = require("../models/PostedJob.model");
const Organization = require("../models/organization.details.model");

// Create a new job
const createJob = async (req, res) => {
  try {
    const {
      compId,
      degName,
      secName,
      jobLocation,
      skills,
      jobDescription,
      yearsOfExperience,
      requirements,
      jobType,
      workPlaceType,
    } = req.body;

    const trimmedCompId = compId.trim();

    const company = await Organization.findOne({ where: { compId: trimmedCompId } });

    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Invalid compId: No matching company found",
        error: "Company does not exist",
      });
    }

    const newJob = await PostedJob.create({
      id: uuidv4(),
      compId: trimmedCompId,
      degName,
      secName,
      jobLocation,
      skills,
      jobDescription,
      yearsOfExperience,
      requirements,
      jobType,
      workPlaceType,
      status: 1,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      jobDetails: newJob,
    });
  } catch (error) {
    console.error("Error in createJob:", error);
    res.status(500).json({
      success: false,
      message: "Error creating job",
      error: error?.message,
    });
  }
};

// Get all jobs (for job seekers)
const getAllJobs = async (req, res) => {
  try {
    const { degName, skills } = req.query;
    const whereClause = { status: 1 };

    if (skills) {
      whereClause.skills = sequelize.where(
        sequelize.fn('JSON_CONTAINS', sequelize.col('skills'), `"${skills}"`),
        true
      );
    }

    if (degName) {
      whereClause.degName = { [Op.like]: `%${degName}%` };
    }

    const jobsWithCompanyDetails = await PostedJob.findAll({
      where: whereClause,
      include: [
        {
          model: Organization,
          as: "organization",
          attributes: [
            "organizationName",
            "logo",
            "address",
            "email",
            "phoneNo",
            "website",
            "description",
            "industry",
            "specialization",
            "since",
            "socialMediaLink",
            "compId",
          ],
        },
      ],
    });

    if (!jobsWithCompanyDetails || jobsWithCompanyDetails.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }

    res.status(200).json({
      message: "Jobs and Company details retrieved successfully",
      data: jobsWithCompanyDetails,
    });
  } catch (error) {
    console.error("Error in getAllJobs:", error);
    res.status(500).json({ message: "Error retrieving jobs", error: error?.message });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await PostedJob.findOne({
      where: { id },
      include: [
        {
          model: Organization,
          as: "organization",
          attributes: [
            "organizationName",
            "logo",
            "address",
            "email",
            "phoneNo",
            "website",
            "description",
            "industry",
            "specialization",
            "since",
            "socialMediaLink",
            "compId",
          ],
        },
      ],
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ data: job });
  } catch (error) {
    console.error("Error in getJobById:", error);
    res.status(500).json({ message: "Error retrieving job", error: error?.message });
  }
};

// Get jobs by company (for org dashboard)
const getJobsByCompany = async (req, res) => {
  try {
    const { compId } = req.params;

    const jobs = await PostedJob.findAll({
      where: {
        compId,
        status: 1,
      },
      include: [
        {
          model: Organization,
          as: "organization",
          attributes: [
            "organizationName",
            "logo",
            "address",
            "email",
            "phoneNo",
            "website",
            "description",
            "industry",
            "specialization",
            "since",
            "socialMediaLink",
            "compId",
          ],
        },
      ],
    });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this company" });
    }

    res.status(200).json({
      message: "Company-specific jobs retrieved successfully",
      data: jobs,
    });
  } catch (error) {
    console.error("Error in getJobsByCompany:", error);
    res.status(500).json({ message: "Error retrieving company jobs", error: error?.message });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const job = await PostedJob.findOne({ where: { id } });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const updatedJob = await job.update(updates);
    res.status(200).json({ success: true, message: "Job updated successfully", data: updatedJob });
  } catch (error) {
    console.error("Error in updateJob:", error);
    res.status(500).json({ message: "Error updating job", error: error?.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await PostedJob.findOne({ where: { id } });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.destroy();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error in deleteJob:", error);
    res.status(500).json({ message: "Error deleting job", error: error?.message });
  }
};

// Get job count
const getJobCount = async (req, res) => {
  try {
    const count = await PostedJob.count();
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    console.error("Error in getJobCount:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching job count",
      error: error.message
    });
  }
};

// ✅ Export all
module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  getJobsByCompany,
  updateJob,
  deleteJob,
  getJobCount
};
