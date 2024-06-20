const Experience = require("../models/experienceModels");
const User = require("../models/userModels");

const addExperienceController = async (req, res) => {
  try {
    const { company_name, designation, join_date, leave_date, userId } = req.body;

    if (!company_name) {
      return res.status(403).json({ message: "Please enter your company_name" });
    }
    if (!designation) {
      return res.status(403).json({ message: "Please enter your designation" });
    }
    if (!join_date) {
      return res.status(403).json({ message: "Please enter your join_date" });
    }
    if (!leave_date) {
      return res.status(403).json({ message: "Please enter your leave_date" });
    }
    if (!userId) {
      return res.status(403).json({ message: "Please provide user ID" });
    }

    // Create a new experience
    const newExperience = new Experience({
      company_name,
      designation,
      join_date,
      leave_date,
    });

    // Save the new experience to the database
    const savedExperience = await newExperience.save();

    // Find the user by ID and update their experience field
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure the experience field is an array
    if (!Array.isArray(user.experience)) {
      user.experience = [];
    }

    // Add the new experience ID to the user's experience array
    user.experience.push(savedExperience._id);
    await user.save();

    // Populate the user's experience to include the full experience details
    const getUserFullInfo = await User.findById(userId).populate('experience');


    res.status(200).json({ success: true, message: "Experience added successfully", experience: savedExperience,  user: getUserFullInfo });
  } catch (error) {
    console.error("Error adding experience:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = addExperienceController;
