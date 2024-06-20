const User = require("../models/userModels");
var bcrypt = require("bcryptjs");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.send("Please enter your email");
  } else if (!password) {
    res.send("Please enter your password");
  } else {
    const isExistUser = await User.find({ email: email }).populate("experience");

    if (isExistUser.length > 0) {
      bcrypt.compare(password, isExistUser[0].password).then(function (result) {
        if (result) {
          res.json({
            success: true,
            message: "Login successful",
            user: isExistUser[0],
          });
        } else {
          return res.send({ error: "Password not matched" });
        }
      });
    } else {
      return res.send({ error: "Email not found" });
    }
  }
};

module.exports = loginController;
