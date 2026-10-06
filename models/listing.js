const mongoose = require("mongoose");
const schema = mongoose.Schema;

const default_link =
  "https://www.google.com/imgres?q=FREE%20airbnb%20villa%20image%20link&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F501386854%2Fphoto%2Ftropical-modern-villa.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3D791hJ7BkqtFRvqqu7Ke6Hourkfg3lkNy5OQWrCz76UY%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fairbnb-house&docid=hOH6ufzp2YZaNM&tbnid=pB_Wm2dVI-s3OM&vet=12ahUKEwji1IHYtqCXAxU3TGwGHeZiJnIQnPAOegUIpAEQAA..i&w=612&h=408&hcb=2&ved=2ahUKEwji1IHYtqCXAxU3TGwGHeZiJnIQnPAOegUIpAEQAA";

const listingSchema = new schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
    default: default_link,
    set: (v) => (v === "" ? default_link : v)
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});

const Listing = mongoose.model("listing", listingSchema);

module.exports = Listing;