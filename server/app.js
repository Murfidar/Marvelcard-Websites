if (process.env.NODE_ENV !== "Production") {
  require("dotenv").config();
}

const express = require("express");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
