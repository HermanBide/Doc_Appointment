import User from '../models/UserSchema.js'

export const updateUser = async (req, res) => {
    const id = req.params.id

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true})
        res.status(200).json({success: true, message: 'Successfully updated user', data: updatedUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message, success: false, message: 'Error!! Failed to update user'})
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id

    try {
        const deletedUser = await User.findByIdAndDelete(id)
        res.status(200).json({success: true, message: 'Successfully deleted user', data: deletedUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message, success: false, message: 'Error!! Failed to delete user'})
    }
}

export const getSingleUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id).select("-password")
        res.status(200).json({success: true, message: 'User has been found', data: user})
    } catch (error) {
        console.error(error)
        res.status(404).json({error: error.message, success: false, message: 'Error!! No user found'})
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({ success: true, message: 'Found all Users', data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, success: false, message: 'Error!! Failed to fetch users' });
    }
};