require("dotenv").config(); // ✅ Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const session = require('express-session');

app.use(session({
  secret: 'tailor-secret-key',
  resave: false,
  saveUninitialized: false
}));



// ✅ MongoDB Atlas connection using env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes

// Home
//app.get("/", (req, res) => {
 // res.redirect("/auth/signup");
//});
const homeRoutes = require('./routes/home');
app.use('/', homeRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const customerRoutes = require('./routes/customer');
app.use('/customer', customerRoutes);



const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
