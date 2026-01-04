const Restaurants = require("./../Models/restaurantModel");

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurants.find();
    res.status(200).json({
      status: "Success",
      length: restaurants.length,
      timeOfhit: req.requestTimeOfHit,
      data: restaurants,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

exports.getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurants.findById(req.params.id);
    if (!restaurant) {
      res.status(404).json({
        staus: "Fail",
        timeOfhit: req.requestTimeOfHit,
        msg: "Check your restaurant id",
      });
    }
    res.status(200).json({
      stat: "Success",
      timeOfhit: req.requestTimeOfHit,
      data: {
        restaurant,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurants.create(req.body);
    res.status(201).json({
      status: "Success",
      timeOfhit: req.requestTimeOfHit,
      data: {
        restaurant,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const updateRestaurant = await Restaurants.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updateRestaurant) {
      return res.status(404).json({
        status: "Fail",
        message: "No data found please check you id",
      });
    }
    res.status(201).json({
      status: true,
      timeOfhit: req.requestTimeOfHit,
      data: updateRestaurant,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};
exports.deleteRestaurant = async (req, res) => {
  try {
    const deleted = await Restaurants.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        status: "Fail",
        message: "No data found please check you id",
      });
    }
    res.status(204).json({
      status: true,
      timeOfhit: req.requestTimeOfHit,
      msg: "delete succesfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};
