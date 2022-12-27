const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login", { layout: "layout", title: "Login" });
});

router.post("/login", (req, res) => {
  res.send("<h1>Login POST</h1>");
});

module.exports = router;
