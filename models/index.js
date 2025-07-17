const PersonalDetails = require("./userPersonalDetails.model");
const EducationalDetails = require("./userEducationalDetails.model");
const ProfessionalDetails = require("./userProfessionalDetails.model");

// Associations
PersonalDetails.hasMany(EducationalDetails, {
  foreignKey: "userId",
  as: "educationalDetails",
});
EducationalDetails.belongsTo(PersonalDetails, {
  foreignKey: "userId",
});

PersonalDetails.hasMany(ProfessionalDetails, {
  foreignKey: "userId",
  as: "professionalDetails",
});
ProfessionalDetails.belongsTo(PersonalDetails, {
  foreignKey: "userId",
});

module.exports = {
  PersonalDetails,
  EducationalDetails,
  ProfessionalDetails,
};
