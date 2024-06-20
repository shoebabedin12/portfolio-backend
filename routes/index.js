const express = require("express");
const router = express.Router();
const multer = require('multer');
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");
const updateUserController = require("../controllers/updateUserController");
const updateUserInfoController = require("../controllers/updateUserInfoController");
const addExperienceController = require("../controllers/addExperienceController");
const deleteExperienceController = require("../controllers/deleteExperienceController");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploads
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const extension = originalname.split(".").pop(); // Get the file extension
    const uniqueFilename = file.fieldname + "-" + Date.now() + "." + extension;
    cb(null, uniqueFilename); // File naming convention with original extension
  },
});

// Set up multer instance with the configured storage
const upload = multer({ storage: storage });

router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/update-user", updateUserController);
router.post("/update-user-info", upload.single('profile_img'), updateUserInfoController);
router.post("/add-experience", addExperienceController);
router.post("/delete-experience", deleteExperienceController);

module.exports = router;
