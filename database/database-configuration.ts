import mongoose from "mongoose";

const mongoConnection = async() => {
  try {
    if(process.env.MONGO_DB) {
      await mongoose.connect(process.env.MONGO_DB);
      console.log('Database online 🌐');
    }else {
      throw new Error();
    }
  }catch(err) {
    throw new Error('Error connection to the database');
  }
};

export default mongoConnection;
