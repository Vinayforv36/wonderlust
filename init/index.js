const mongoose = require('mongoose');
const data = require('./data.js');
const Listing = require('../models/listing.js');

const mongo_url = "mongodb://localhost:27017/wonderlust";

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

async function main() {
  await mongoose.connect(mongo_url);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(data.data);
  console.log("Database initialized");
};

initDB().catch((err) => {
  console.error("Error initializing database:", err);
});