import mongoose from 'mongoose';

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection established!");
  } catch (error) {
    console.log("Connection to database FAILED", error);
    throw error;
  }
};

export default connectDB;