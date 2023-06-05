const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("../config/corsOptions");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("../config/dbConn");

// .env file configuration
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const mongoDbUrl = process.env.MONGO_DB_URL;

const app = express();

// Connect to the database
connectDB(mongoDbUrl);

// Middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "..", "/public")));

// Routes
const rootRoute = require("./routes/root");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const noteRoute = require("./routes/noteRoute");
app.use("/", rootRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/notes", noteRoute);

// Handle 404 errors
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "..", "/src/views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
