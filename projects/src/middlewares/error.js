export const error = (err, req, res, next) => {
  console.log(err);
  res.send(500, "Something broke. What did you do?");
};
