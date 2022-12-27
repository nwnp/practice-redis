exports.logger = (req, res, next) => {
  const PORT = process.env.SERVER_PORT;
  console.log(`[${req.method}] http://localhost:${PORT}${req.originalUrl}`);
  next();
};
