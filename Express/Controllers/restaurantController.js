const fs = require("fs");
const restaurantData = JSON.parse(
  fs.readFileSync("./Restaurant.json", "utf-8")
);

exports.getAllRestaurants = (req, res) => {
  res.status(200).json({
    status: "Success",
    timeOfhit: req.requestTimeOfHit,
    data: restaurantData,
  });
};

exports.getRestaurant = (req, res) => {
  const id = req.params.id;
  const restaurant = restaurantData.find((el) => el.id == id);
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
};

exports.createRestaurant = (req, res) => {
  const newId = restaurantData.length;
  const newRestaurant = Object.assign({ id: newId }, req.body);
  restaurantData.push(newRestaurant);

  fs.writeFile("./Restaurant.json", JSON.stringify(restaurantData), (err) => {
    if (err) {
      res.status(400).json({
        stat: "Fail ",
        timeOfhit: req.requestTimeOfHit,
        msg: "Fail to create rtestaurant",
      });
    }
    res.status(201).json({
      status: "Success",
      timeOfhit: req.requestTimeOfHit,
      data: {
        newRestaurant,
      },
    });
  });
};

exports.updateRestaurant = (req, res) => {
  const id = req.params.id;
  const restaurant = restaurantData.find((el) => el.id == id);
  if (!restaurant) {
    res.status(404).json({
      staus: "Fail",
      timeOfhit: req.requestTimeOfHit,
      msg: "Check your restaurant id",
    });
  }
  res.status(200).json({
    status: true,
    timeOfhit: req.requestTimeOfHit,
    msg: "Updated succesfully",
  });
};
exports.deleteRestaurant = (req, res) => {
  const id = req.params.id;
  const restaurant = restaurantData.find((el) => el.id == id);
  if (!restaurant) {
    res.status(404).json({
      staus: "Fail",
      timeOfhit: req.requestTimeOfHit,
      msg: "Check your restaurant id",
    });
  }
  res.status(204).json({
    status: true,
    timeOfhit: req.requestTimeOfHit,
    msg: "delete succesfully",
  });
};
