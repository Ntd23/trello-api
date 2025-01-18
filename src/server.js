import express from "express";

const app = express();

const hostname = "localhost";
const port = 8000;

app.get("/", function (req, res) {
  res.send("<a>das</a>");
});

app.listen(port, hostname, () => {
  console.log("express");
});
