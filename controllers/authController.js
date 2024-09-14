import User from "../models/User.js";
import generateToken from "../utils/jwtUtils.js";

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password, role });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    role: user.role,
    email: user.email,
    // token: generateToken(user._id),
  });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      role: user.role
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

export { registerUser, loginUser };
