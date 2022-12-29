exports.csrf = (req, res, next) => {
  res.locals.token = req.csrfToken();
  next();
};
