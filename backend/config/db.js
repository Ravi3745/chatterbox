const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit with non-zero exit code to indicate failure
    }
}

module.exports = connectDB;
