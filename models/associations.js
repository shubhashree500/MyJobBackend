const PostedJob = require("./PostedJob.model");
const SavedJob = require("./SavedJob.model");
const Organization = require("./organization.details.model");
const JobApplication = require("./JobApplication.model");

// SavedJob → PostedJob
SavedJob.belongsTo(PostedJob, {
  foreignKey: "jobId",
  targetKey: "id",
  as: "jobDetails",
});

// JobApplication → PostedJob
JobApplication.belongsTo(PostedJob, {
  foreignKey: "job_id",
  targetKey: "id",
  as: "job",
});

// PostedJob → JobApplication (optional)
PostedJob.hasMany(JobApplication, {
  foreignKey: "job_id",
});
