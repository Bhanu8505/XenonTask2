const User = require('../models/user');

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, accountType } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    
    const newUser = new User({
      firstName,
      lastName,
      email,
      password, 
      accountType,
    });


    await newUser.save();

    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  signup,
};
