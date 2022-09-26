import { auth } from "../middlewares/utilities.js";

export const index = (req, res, next) => {
  res.cookie("IndexCookie", "This was set from Index");
  res.render("index", {
    title: "Practice Redis",
    body: "Index",
    cookie: JSON.stringify(req.cookies),
    session: JSON.stringify(req.session),
    signedCookie: JSON.stringify(req.signedCookies),
  });
};

export const login = (req, res, next) => {
  console.log("here");
  res.render("login", { title: "Login" });
};

export const loginProcess = (req, res, next) => {
  const { username, password, session } = req.body;
  const isAuth = auth(username, password, session);
  res.send(username + password);
  // const isAuth = auth(username, password, session);
  // if (isAuth) {
  //   res.redirect("/chat");
  // } else {
  //   res.redirect("/login");
  // }
};

export const chat = (req, res, next) => {
  res.render("chat", { title: "Chat", body: "chat" });
};
