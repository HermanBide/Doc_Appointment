import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated Doctor",
      data: updatedDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      success: false,
      message: "Error!! Failed to update Doctor",
    });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted Doctor",
      data: deletedDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      success: false,
      message: "Error!! Failed to delete Doctor",
    });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .Select("-password");
    res
      .status(200)
      .json({ success: true, message: "Doctor has been found", data: doctor });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: error.message,
      success: false,
      message: "Error!! No Doctor found",
    });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    //Query passed in params to Search for doctors by name
    const { query } = req.query;
    let doctors;
    //if param exits
    if (query) {
      //then find the doctor
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }
    //
    res
      .status(200)
      .json({ success: true, message: "Found all Doctors", data: doctors });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: error.message,
      success: false,
      message: "Error!! No Doctors found",
    });
  }
};
