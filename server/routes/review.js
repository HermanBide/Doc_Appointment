import express from "express";
import { createReview, getAllReviews } from "../controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

//merger params to grab id from nested routes
const router = express.Router({mergeParams: true});



router
  .route("/")
  .get(getAllReviews)
  .post(authenticate, restrict(["patient"]), createReview);

export default router;
