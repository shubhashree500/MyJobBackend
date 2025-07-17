const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const ProfessionalDetails = sequelize.define("professionalDetails", {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "personaldetails", // ✅ Must match actual table name
      key: "userId",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  jobRole: { type: DataTypes.STRING, defaultValue: null },
  companyName: { type: DataTypes.STRING, defaultValue: null },
  experience: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
    validate: { min: 0 },
  },
  ctc: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
    validate: { min: 0 },
  },
  skill: { type: DataTypes.STRING, defaultValue: null },
  createdBy: { type: DataTypes.STRING, defaultValue: null },
  createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  updatedBy: { type: DataTypes.STRING, defaultValue: null },
  updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  status: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
}, {
  timestamps: true,
  paranoid: true,
});

module.exports = ProfessionalDetails;
