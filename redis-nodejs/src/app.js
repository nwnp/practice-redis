const dotenv = require("dotenv");
dotenv.config();
const { notFound, error } = require("./middlewares/error-handling");
const { logger } = require("./middlewares/logging");
const express = require("express");
const partials = require("express-partials");
const app = express();
const router = require("./routes");

const PORT = process.env.SERVER_PORT;
const ENV = process.env.NODE_ENV;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(partials());
app.set("view options", { defaultLayout: "layout" });

app.use(logger);
app.use(express.static(__dirname + "/static"));
app.use("/chat", router.chatRoute);
app.use("/user", router.userRoute);
app.get("/", (req, res) => {
  res.render("index", { layout: "layout", title: "Index" });
});

app.use(error);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`App server running on port ${PORT}:${ENV}`);
});
