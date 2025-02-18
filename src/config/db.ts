import colors from "colors";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.cyan.bold(`DB connected to ${url}`));
  } catch (err) {
    console.log(colors.bgRed.white.bold(err.message));
    process.exit(1);
  }
};
