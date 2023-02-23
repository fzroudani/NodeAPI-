const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
app.use(cors());
const connectDB = require("./db");
const User = require("./models/User");
const router = require("./UserControler/route");
app.use(express.json());
app.use(router);
app.use("/", require("./UserControler/route"));

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(`started on port ${PORT} \n http://localhost:${PORT}/`);
  })
);
