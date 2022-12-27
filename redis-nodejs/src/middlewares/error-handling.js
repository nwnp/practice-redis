exports.notFound = (req, res, next) => {
  res
    .status(404)
    .send("You seem lost. You must have take a wrong turn back there.");
};

exports.error = (err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("Something broke. What did you do?");
};
