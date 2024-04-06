const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("successfully connected to mongo database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
