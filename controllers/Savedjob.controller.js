const SavedJob = require("../models/SavedJob.model");
const PostedJob = require("../models/PostedJob.model");
const Organization = require("../models/organization.details.model");

const createSavedJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    console.log("➡️ Received POST /savedjob/create with userId:", userId, "jobId:", jobId);

    if (!userId || !jobId) {
      return res.status(400).json({ message: "Missing userId or jobId" });
    }

    const job = await PostedJob.findOne({ where: { id: jobId } });

    if (!job) {
      console.log("❌ Job not found for jobId:", jobId);
      return res.status(404).json({ message: "Job not found" });
    }

    const exists = await SavedJob.findOne({ where: { userId, jobId } });

    if (exists) {
      console.log("ℹ️ Already saved.");
      return res.status(409).json({ message: "Already saved" });
    }

    const saved = await SavedJob.create({
      userId,
      jobId,
      createdBy: userId, // Ensure createdBy is not null
    });

    console.log("✅ Saved job:", saved.toJSON());

    return res.status(201).json({ message: "Saved!", saved });
  } catch (error) {
    console.error("❌ Error in createSavedJob:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getSavedJobsByUserId = async (req, res) => {
  const { userId } = req.params;

  console.log("📥 [GET] /savedjob/user/:userId called with userId =", userId);

  if (!userId) {
    console.warn("⚠️ userId param is missing");
    return res.status(400).json({ message: "userId is required." });
  }

  try {
    const savedJobs = await SavedJob.findAll({
      where: { userId },
      include: [
        {
          model: PostedJob,
          as: "jobDetails",
          include: [
            {
              model: Organization,
              as: "organization",
            },
          ],
        },
      ],
    });

    console.log(`✅ Found ${savedJobs.length} saved jobs for user ${userId}`);
    return res.status(200).json({ savedJobs });

  } catch (error) {
    console.error("❌ Error fetching saved jobs:", error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};


const deleteSavedJob = async (req, res) => {
  try {
    const { userId, jobId } = req.params;

    if (!userId || !jobId) {
      return res.status(400).json({ message: "userId and jobId are required." });
    }

    const deleted = await SavedJob.destroy({ where: { userId, jobId } });

    if (deleted) {
      return res.status(200).json({ message: "Job unsaved successfully." });
    } else {
      return res.status(404).json({ message: "Saved job not found." });
    }
  } catch (error) {
    console.error("❌ Error in deleteSavedJob:", error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

module.exports = {
  createSavedJob,
  getSavedJobsByUserId,
  deleteSavedJob,
};
