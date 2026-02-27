const mongoose = require("mongoose");
const dotenv = require("dotenv")
const Product = require("./models/Product")
const User = require("./models/User")
const products = require("./data/products");
const Cart = require("./models/cart")

dotenv.config()

mongoose.connect(process.env.MONGODB_URI)

const seedData = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()
        await Cart.deleteMany()
        const createdUser = await User.create({
            name: "Admin",
            email: "admin@example.com",
            password: "123456",
            role: "admin"
        })

        const userID = createdUser._id

        const sampleProduct = products.map((product) => {
            return {...product, user: userID}
        })

        await Product.insertMany(sampleProduct)

        console.log("Product data seeded successfully")

    } catch (error) {
        console.error(error)
    }
}

seedData()