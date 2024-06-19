const User = require("../models/userModels");

const updateUserController = async (req, res) => {
  const userDetails = req.body;
  
  if (!userDetails?.name) {
    return res.status(403).json({ message: "please enter your name" });
  } else if (!userDetails.profession) {
    return res.status(403).json({ message: "please enter your profession" });
  } else if (!userDetails.email) {
    return res.status(403).json({ message: "please enter your email" });
  } else if (!userDetails.phone) {
    return res.status(403).json({ message: "please enter your phone" });
  } else if (!userDetails.address) {
    return res.status(403).json({ message: "please enter your address" });
  } else {
    const existingUser = await User.findById({ _id: userDetails?._id });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the existing user's information
    existingUser.name = userDetails.name;
    existingUser.profession = userDetails.profession;
    existingUser.email = userDetails.email;
    existingUser.phone = userDetails.phone;
    existingUser.address = userDetails.address;

    await existingUser.save();

    res.status(200).json({
      success: true,
      message: `User ${existingUser.name} updated successfully`,
      user: existingUser
    });
  }
};

module.exports = updateUserController;
