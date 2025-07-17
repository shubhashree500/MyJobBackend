const JobApplication = require("../models/JobApplication.model");
const PostedJob = require("../models/PostedJob.model");
const { Op } = require("sequelize");

const applyJob = async (req, res) => {
  try {
    const { job_id, resume_url } = req.body;
    const user_id = req.id;

    const existing = await JobApplication.findOne({
      where: { job_id, user_id },
    });

    if (existing) {
      return res.status(409).json({ message: "Already applied for this job." });
    }

    const application = await JobApplication.create({
      job_id,
      user_id,
      resume_url,
      applied_at: new Date(),
    });

    return res.status(201).json({
      message: "Job applied successfully",
      application,
    });
  } catch (error) {
    console.error("🔥 Apply Job Error:", error.message);
    res.status(500).json({ message: "Server error", error });
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const user_id = req.id;

    const applications = await JobApplication.findAll({
      where: { user_id },
      include: [
        {
          model: PostedJob,
          as: 'jobDetails',
          attributes: ['id', 'degName', 'jobLocation', 'jobType'],
        },
      ],
      order: [['applied_at', 'DESC']],
    });

    const formatted = applications.map((app) => ({
      id: app.id,
      title: app.jobDetails?.degName || 'N/A',
      company: app.jobDetails?.jobType || 'N/A',
      location: app.jobDetails?.jobLocation || '',
      applied_at: app.applied_at,
      status: app.status, // ✅ Include status too
    }));

    return res.status(200).json({ applications: formatted });
  } catch (err) {
    console.error("⚠️ Get Applied Jobs Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const withdrawApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const user_id = req.id;

    const application = await JobApplication.findOne({
      where: {
        id: applicationId,
        user_id, // ✅ Ensure only the owner can delete
      },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    await application.destroy();

    return res.status(200).json({ message: "Application withdrawn successfully" });
  } catch (err) {
    console.error("❌ Withdraw Application Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  applyJob,
  getAppliedJobs,
  withdrawApplication, // ✅ Export it
};
