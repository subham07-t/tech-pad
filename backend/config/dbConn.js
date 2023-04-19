const mongoose = require("mongoose");
const { logEvents } = require("../src/middleware/logger");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
  } catch (err) {
    console.log(err);
  }
};

mongoose.connection.once("open", () => {
  console.log("DB connect successfully");
});

mongoose.connection.on("error", (err) => {
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

module.exports = connectDB;
