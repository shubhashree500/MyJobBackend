const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Organization = require("./organization.details.model");

const PostedJob = sequelize.define("PostedJob", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  jobId: {
    type: DataTypes.STRING,
  },
  compId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  degName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  secName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  jobDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  yearsOfExperience: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  requirements: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  jobType: {
    type: DataTypes.ENUM("Full-Time", "Part-Time", "Contract", "Internship"),
    allowNull: false,
  },
  workPlaceType: {
    type: DataTypes.ENUM("Onsite", "Hybrid", "Remote"),
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "postedjob",
  timestamps: true,
});

PostedJob.belongsTo(Organization, {
  foreignKey: "compId",
  as: "organization",
});

module.exports = PostedJob;
