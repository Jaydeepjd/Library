const app = require("./index");
const dotenv = require("dotenv");
dotenv.config({ path: "./.config.env" });
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Db connected Succesfully");
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT_NO, () => {
  console.log("Server started on port no ", process.env.PORT_NO);
});
