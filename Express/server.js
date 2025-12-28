const app = require("./index");
const dotenv = require("dotenv");
dotenv.config({ path: "./.config.env" });

app.listen(process.env.PORT_NO, () => {
  console.log("Server started on port no ", process.env.PORT_NO);
});
