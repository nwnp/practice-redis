const dotenv = require("dotenv");
dotenv.config();
const { notFound, error } = require("./middlewares/error-handling");
const { logger } = require("./middlewares/logging");
const express = require("express");
const partials = require("express-partials");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
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
app.use(cookieParser("my-cookie-secret"));
app.use(
  session({
    secret: "my-cookie-secret",
    saveUninitialized: true,
    resave: true,
    store: new RedisStore({
      url: "redis://localhost",
    }),
  })
);
app.use(function (req, res, next) {
  if (req.session.pageCount) req.session.pageCount++;
  else req.session.pageCount = 1;
  next();
});
app.use("/chat", router.chatRoute);
app.use("/user", router.userRoute);
app.get("/", (req, res) => {
  res.cookie("IndexCookie", "This was set from Index");
  res.render("index", {
    layout: "layout",
    title: "Index",
    cookie: JSON.stringify(req.cookies),
    session: JSON.stringify(req.session),
    signedCookie: JSON.stringify(req.signedCookies),
  });
});

app.use(error);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`App server running on port ${PORT}:${ENV}`);
});
