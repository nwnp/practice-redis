export const csrfUtil = (req, res, next) => {
  res.locals.token = req.csrfToken();
  next();
};

export const auth = (username, password, session) => {
  const isAuth = username === "pa12" || username === "nwnp";
  console.log(isAuth);
  if (isAuth) {
    console.log(session);
    session.isAuthenticated = isAuth;
    session.user = { username };
  }
  return isAuth;
};

export const authenticated = (req, res, next) => {
  console.log("session", req.session);
  res.locals.isAuthenticated = req.session.isAuthenticated;
  if (req.session.isAuthenticated) {
    res.locals.user = req.session.user;
  }
  next();
};

export const requireAuthentication = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
};
