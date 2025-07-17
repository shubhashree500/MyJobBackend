// models/organization.details.model.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const { v4: uuidv4 } = require("uuid");

const Organization = sequelize.define("Organization", {
  compId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    organizationName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
     logo: { type: DataTypes.STRING, allowNull: true },
  address: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  phoneNo: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: false },
  website: { type: DataTypes.STRING, allowNull: true },
  socialMediaLink: { type: DataTypes.STRING, allowNull: true },
  industry: { type: DataTypes.STRING, allowNull: true },
  since: { type: DataTypes.DATEONLY, allowNull: true },
  specialization: { type: DataTypes.STRING, allowNull: true },
  type: { type: DataTypes.STRING, defaultValue: "Org" },
  createdBy: { type: DataTypes.INTEGER, allowNull: true },
  updatedBy: { type: DataTypes.INTEGER, allowNull: true },
  status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
  createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
  timestamps: true,
  tableName: "organization",
});
 Organization.associate = (models) => {
    Organization.hasMany(models.Postedjob, {
      foreignKey: 'compId',
      sourceKey: 'compId',
    });
  };

module.exports = Organization;
