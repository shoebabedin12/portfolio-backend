const User = require("../models/userModels");

const updateUserInfoController = async (req, res) => {
  try {
    const { description, _id } = req.body; // Get form fields
    const profile_img = req.file; // Get the uploaded file

    if (!profile_img) {
      return res.status(403).json({ message: "Please upload your profile image" });
    }

    if (!description) {
      return res.status(403).json({ message: "Please enter your description" });
    }

    const existingUser = await User.findById(_id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    existingUser.profile_img = profile_img.path; // Save the file path
    existingUser.description = description;

    await existingUser.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: existingUser
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateUserInfoController;
