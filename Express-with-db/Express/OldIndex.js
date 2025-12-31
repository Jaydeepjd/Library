const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
// middleware
app.use((req, res, next) => {
  const now = new Date();
  req.requestTimeOfHit = now.toLocaleString();
  next();
});

const restaurantData = JSON.parse(
  fs.readFileSync("./Restaurant.json", "utf-8")
);

// C: Create(Post)
// R: Read(get)
// U: Update(Put & Patch)
// D: Delete (Delete)

// Controllers
const getAllRestaurants = (req, res) => {
  res.status(200).json({
    status: "Success",
    timeOfhit: req.requestTimeOfHit,
    data: restaurantData,
  });
};

const getRestaurant = (req, res) => {
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

const createRestaurant = (req, res) => {
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

const updateRestaurant = (req, res) => {
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
const deleteRestaurant = (req, res) => {
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
// 1.api endpoint 2. callback function (req,res)
// // read all restaurant data
// app.get("/api/v1/restaurant", getAllRestaurants);
// // read single restaurant data
// app.get("/api/v1/restaurant/:id", getRestaurant);
// // create restaurant data
// app.post("/api/v1/restaurant", createRestaurant);
// // update restaurant data
// app.patch("/api/v1/restaurant/:id", updateRestaurant);
// // delete restaurant data
// app.delete("/api/v1/restaurant/:id", deleteRestaurant);
const restaurantRouter = express.Router();
restaurantRouter.route("/").get(getAllRestaurants).post(createRestaurant);
restaurantRouter
  .route("/:id")
  .get(getRestaurant)
  .patch(updateRestaurant)
  .delete(deleteRestaurant);

app.use("/api/v1/restaurant", restaurantRouter);

app.listen(9000, () => {
  console.log("Server started on port no 9000");
});
