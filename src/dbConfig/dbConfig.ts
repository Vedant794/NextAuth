import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    await mongoose.connect(mongoUri);

    console.log("✅ Database connected successfully!");

    mongoose.connection.on("error", (error) => {
      console.error("❌ Database connection error:", error);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}
