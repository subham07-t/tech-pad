const mongoose = require("mongoose");
const { logEvents } = require("../src/middleware/logger");

// Connect to the MongoDB database
const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
  } catch (err) {
    console.log(err);
  }
};

// Log a success message when the connection is opened
mongoose.connection.once("open", () => {
  console.log("DB connect successfully");
});

// Log any errors that occur during the connection process
mongoose.connection.on("error", (err) => {
  if (err.name === "MongoError") {
    const message = `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`;
    logEvents(message, "mongoErrLog.log");
  } else if (err.name === "MongooseServerSelectionError") {
    const message = `Failed to connect to MongoDB Atlas: ${err.reason}`;
    logEvents(message, "mongoErrLog.log");
  } else {
    const message = `An error occurred: ${err.message}`;
    logEvents(message, "mongoErrLog.log");
  }
});

module.exports = connectDB;
