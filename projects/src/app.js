import { index, login, loginProcess, chat } from "./routes/index.js";
import { notFound } from "./middlewares/errorHandlers.js";
import { fileURLToPath } from "url";
import { error } from "./middlewares/error.js";
import {
  csrfUtil,
  authenticated,
  requireAuthentication,
} from "./middlewares/utilities.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectRedis from "connect-redis";
import partials from "express-partials";
import express from "express";
import morgan from "morgan";
import csrf from "csurf";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Redis = connectRedis(session);
const RedisStore = new Redis({ url: "redis://localhost" });

const app = express();
const PORT = 3000;
const HOST = "localhost";

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("view options", { defaultLayout: "layout" });

app.use(morgan("dev"));
app.use(partials());
app.use(express.static(__dirname + "/static"));
app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    store: RedisStore,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(csrf());
app.use(csrfUtil);
app.use(authenticated);

app.use((req, res, next) => {
  if (req.session.pageCount) req.session.pageCount++;
  else req.session.pageCount = 1;
  next();
});

app.get("/", index);
app.get("/login", login);
app.post("/login", loginProcess);
app.get("/chat", [requireAuthentication], chat);

app.get("/error", (req, res, next) => {
  next(new Error("A contrived error"));
});

app.use(error);
app.use(notFound);

app.listen(PORT, HOST, () => {
  console.log(`The server is running on http://${HOST}:${PORT}`);
});
