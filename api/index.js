const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')

const urlRoute = require("./routes/pathFinder");

const connectDb = require("./utils/dbConnection");

require("dotenv").config();
const app = express();

connectDb();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

// Define routes
app.use("/api/v1", urlRoute);

// Define a PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
