const express = require("express");
const app = express();
const restaurantRouter = require("./Routes/restaurantRoutes");
const requestTimeOfHit = require("./Middlewares/requestTimeOfHit");
const authRoutes = require("./Routes/authRoutes");
app.use(express.json());
// middleware
app.use(requestTimeOfHit);

app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/authentication", authRoutes);

module.exports = app;
