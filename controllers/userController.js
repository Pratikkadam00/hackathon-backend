import User from "../models/User.js"; 

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "name _id"); // Select only name and _id fields
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};
