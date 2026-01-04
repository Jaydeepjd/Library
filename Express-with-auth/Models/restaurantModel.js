const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Restaurant Name is required"],
      unique: [true, "Name Already Taken"],
    },
    cloudinaryImageId: { type: String },
    locality: { type: String },
    areaName: { type: String },
    costForTwo: { type: String },
    cuisines: [String],
    avgRating: { type: Number },
    parentId: { type: String },
    avgRatingString: { type: String },
    totalRatingsString: { type: String },
    nextCloseTime: { type: String },
    opened: {
      type: Boolean,
      default: true,
      enum: {
        values: [true, false],
        message: "Value should be either True or False ",
      },
    },
  },
  { timestamps: true }
);

const Restaurants = mongoose.model("restaurants", restaurantSchema);
module.exports = Restaurants;
