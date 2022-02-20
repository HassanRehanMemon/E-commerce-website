import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!)
    console.log('connected succesfully')
    return conn
  } catch (error) {
    console.log('COULD NOT CONNECT to db')
  }
}

export default connectDB
