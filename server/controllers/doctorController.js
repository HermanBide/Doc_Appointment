import Doctor from '../models/DoctorSchema.js';

export const updateDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: 'Successfully updated Doctor', data: updatedDoctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update Doctor', error: error.message });
    }
};

export const deleteDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Successfully deleted Doctor', data: deletedDoctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete Doctor', error: error.message });
    }
};

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const doctor = await Doctor.findById(id).populate("reviews").select("-password");
        res.status(200).json({ success: true, message: 'Doctor found', data: doctor });
    } catch (error) {
        console.error(error);
        res.status(404).json({ success: false, message: 'No Doctor found', error: error.message });
    }
};

export const getAllDoctors = async (req, res) => {
    try {
        const { query } = req.query;
        let doctors;
        if (query) {
            doctors = await Doctor.find({
                isApproved: "approved",
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } },
                ],
            }).select("-password");
        } else {
            doctors = await Doctor.find({ isApproved: "approved" }).select("-password");
        }
        res.status(200).json({ success: true, message: 'Found all Doctors', data: doctors });
    } catch (error) {
        console.error(error);
        res.status(404).json({ success: false, message: 'No Doctors found', error: error.message });
    }
};
