const express = require("express");
const restaurantController = require("./../Controllers/restaurantController");
const routes = express.Router();
routes
  .route("/")
  .get(restaurantController.getAllRestaurants)
  .post(restaurantController.createRestaurant);
routes
  .route("/:id")
  .get(restaurantController.getRestaurant)
  .patch(restaurantController.updateRestaurant)
  .delete(restaurantController.deleteRestaurant);

module.exports = routes;
