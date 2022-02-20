import connectDB from './config/db'
import products from './data/products'
import users from './data/users'
import Product from './models/productModel'
import User from './models/userModel'
import dotenv from 'dotenv'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()

    const insertedUsers = await User.insertMany(users)
    const admin = insertedUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: admin }
    })

    await Product.insertMany(sampleProducts)
    console.log('Data inserted succefully')

    process.exit()
  } catch (error) {
    console.log(`data couldn't be inserted ${error}`)
    process.exit(1)
  }
}

const deleteData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()

    console.log('Data delete SUCCESSFULLY ')
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  deleteData()
} else {
  importData()
}
