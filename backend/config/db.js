import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `DB Connection Success 
      Host: ${conn.connection.host}
      Port: ${conn.connection.port}
      Name: ${conn.connection.name}`,
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
