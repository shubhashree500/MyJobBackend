const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const PostedJob = require("./PostedJob.model");
const PersonalDetails = require("./userPersonalDetails.model"); // make sure this path is correct

const JobApplication = sequelize.define("JobApplication", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  job_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  resume_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Reviewed", "Interview", "Rejected", "Accepted"),
    defaultValue: "Pending",
  },
  applied_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: "job_applications",
  timestamps: false,
});

// Associations
JobApplication.belongsTo(PostedJob, {
  foreignKey: "job_id",
  as: "jobDetails",
});

JobApplication.belongsTo(PersonalDetails, {
  foreignKey: "user_id",
  as: "applicant",
});

module.exports = JobApplication;
