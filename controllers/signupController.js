const User = require("../models/userModels");
var bcrypt = require('bcryptjs');

const signupController = async(req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(403).json({ message: "please enter your Name" });
  } else if (!email) {
    return res.status(403).json({ message: "please enter your Email" });
  } else if (!password) {
    return res.status(403).json({ message: "please enter your Password" });
  }else {
    const duplicate = await User.find({ email: email });

    if (duplicate.length > 0) {
        return res.send({ error: "User Already Exist" });
    }

    
    bcrypt.hash(password, 10, async function (err, hash) {
        const user = await User({
          name,
          email,
          password: hash
        });
        user.save()
        if (user) {
          res.status(200).json({ success: `New user ${user.name} created` });
        } else {
          res.status(400).json({ message: `Invalid user data received` });
        }
      });
  }
}

module.exports = signupController;
