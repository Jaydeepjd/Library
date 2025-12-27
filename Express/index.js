const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

const restaurantData = JSON.parse(
  fs.readFileSync("./Restaurant.json", "utf-8")
);

// C: Create(Post)
// R: Read(get)
// U: Update(Put & Patch)
// D: Delete (Delete)

// 1.api endpoint 2. callback function (req,res)
// read all restaurant data
app.get("/api/v1/restaurant", (req, res) => {
  res.status(200).json({
    status: "Success",
    data: restaurantData,
  });
});
// read single restaurant data
app.get("/api/v1/restaurant/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restaurantData.find((el) => el.id == id);
  if (!restaurant) {
    res.status(404).json({
      staus: "Fail",
      msg: "Check your restaurant id",
    });
  }

  res.status(200).json({
    stat: "Success",
    data: {
      restaurant,
    },
  });
});
// create restaurant data
app.post("/api/v1/restaurant", (req, res) => {
  const newId = restaurantData.length;
  const newRestaurant = Object.assign({ id: newId }, req.body);
  restaurantData.push(newRestaurant);

  fs.writeFile("./Restaurant.json", JSON.stringify(restaurantData), (err) => {
    if (err) {
      res.status(400).json({
        stat: "Fail ",
        msg: "Fail to create rtestaurant",
      });
    }
    res.status(201).json({
      status: "Success",
      data: {
        newRestaurant,
      },
    });
  });
});
// update restaurant data
app.patch("/api/v1/restaurant/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restaurantData.find((el) => el.id == id);
  if (!restaurant) {
    res.status(404).json({
      staus: "Fail",
      msg: "Check your restaurant id",
    });
  }
  res.status(200).json({
    status: true,
    msg: "Updated succesfully",
  });
});
// delete restaurant data
app.delete("/api/v1/restaurant/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restaurantData.find((el) => el.id == id);
  if (!restaurant) {
    res.status(404).json({
      staus: "Fail",
      msg: "Check your restaurant id",
    });
  }
  res.status(204).json({
    status: true,
    msg: "delete succesfully",
  });
});

app.listen(9000, () => {
  console.log("Server started on port no 9000");
});
