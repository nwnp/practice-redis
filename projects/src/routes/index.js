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
  res.render("login", { title: "Login", body: "login" });
};

export const loginProcess = (req, res, next) => {
  res.send("loginProcess");
};

export const chat = (req, res, next) => {
  res.render("chat", { title: "Chat", body: "chat" });
};
