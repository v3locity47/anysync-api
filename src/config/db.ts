import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async () => {
  const mongoConnection = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  if (mongoConnection) console.log("MongoDB Connected");
};

export { connectDB };
