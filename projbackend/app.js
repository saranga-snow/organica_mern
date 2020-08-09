require("dotenv").config()

const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
//My routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const stripeRoutes = require("./routes/stripepayment")
const braintreeRoutes = require("./routes/braintreepayment")
const app = express()

//DB CONNECTIONS
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED!!")
  })
  .catch("ERROOOOOOOOOOOOOOOOOOOOOOOOOR IN DB CONNECTION!!")

//MIDDLEWARE
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json())

//ROUTES

app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", orderRoutes)
app.use("/api", stripeRoutes)
app.use("/api", braintreeRoutes)

//Starting SERVER

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server up and listening at ${port}....`)
})
