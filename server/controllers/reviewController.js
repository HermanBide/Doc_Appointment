import Review from '../models/ReviewSchema.js';
import Doctor from '../models/DoctorSchema.js';

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.status(200).json({ success: true, message: 'Successfully retrieved all reviews', data: reviews });
    } catch (error) {
        console.error(error);
        res.status(404).json({ success: false, message: 'Reviews not found', error: error.message });
    }
}

export const createReview = async (req, res) => {
    if (!req.body.doctor) req.body.doctor = req.params.doctorId;
    if (!req.body.user) req.body.user = req.userId;

    const newReview = new Review(req.body);

    try {
        const savedReview = await newReview.save();
        await Doctor.findByIdAndUpdate(req.body.doctor, { $push: { reviews: savedReview._id } });
        res.status(200).json({ success: true, message: 'Review submitted', data: savedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to submit review', error: error.message });
    }
}

// Import createReview after its definition
// import { createReview, getAllReviews } from "../controllers/userController.js";
