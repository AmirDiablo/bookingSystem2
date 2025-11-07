require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const userRoutes = require("./routes/userRoutes.js")
const verificationRoute = require("./routes/verification.js")
const showRoutes = require("./routes/showRoutes.js")
const bookingRoutes = require("./routes/bookingRoutes.js")
const adminRoutes = require("./routes/adminRoutes.js")
const stripeWebhooks = require("./controllers/stripeWebhooks.js")

const app = express()

//stripe webhooks Route
app.use('/api/stripe', express.raw({type: "application/json"}), stripeWebhooks)

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // اگر از کوکی یا header خاص استفاده می‌کنی
}));
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

app.use("/api/user", userRoutes)
app.use("/api/verification", verificationRoute)
app.use("/uploads", express.static("uploads"))
app.use("/api/show", showRoutes)
app.use("/api/booking", bookingRoutes)
app.use("/api/admin", adminRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    app.listen(process.env.PORT, ()=> {
        console.log("connected to DB and server start listen on port", process.env.PORT)
    })
})
.catch((err)=> {
    console.log(err)
})