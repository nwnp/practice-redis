const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login", { layout: "layout", title: "Login" });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.send(req.body.username + " " + req.body.password);
});

module.exports = router;
