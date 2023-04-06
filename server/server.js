const express = require("express");
const app = express();
const NewRoutes = require("./routers/index");

app.use(express.json());
app.use("/api", NewRoutes);

app.listen(5000, () => {
  console.log("Port is listening !!!");
});