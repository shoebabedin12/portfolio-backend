const Experience = require("../models/experienceModels");
const User = require("../models/userModels");

const deleteExperienceController = async (req, res) => {
  try {
    const {descriptionId, userId } = req.body;

    if (!descriptionId) {
      return res.status(403).json({ message: "Please enter your description Id" });
    }
 
    if (!userId) {
      return res.status(403).json({ message: "Please provide user ID" });
    }


    // Find the user by ID and update their experience field
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  // Ensure the experience field is an array and remove the descriptionId
    user.experience = user.experience.filter(id => id.toString() !== descriptionId);

    await user.save();

    // Optionally, remove the experience from the Experience collection
    await Experience.findByIdAndRemove(descriptionId);

    const getUserFullInfo = await User.findById(userId).populate('experience');

    res.status(200).json({ success: true, message: "Experience deleted successfully", user: getUserFullInfo });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = deleteExperienceController;
