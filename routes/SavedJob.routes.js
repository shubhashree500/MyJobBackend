const express = require("express");
const router = express.Router();
const controller = require("../controllers/SavedJob.controller");

router.post("/create", controller.createSavedJob);
router.get("/user/:userId", controller.getSavedJobsByUserId);
router.delete("/delete/:userId/:jobId", controller.deleteSavedJob);

module.exports = router;
