const requestTimeOfHit = (req, res, next) => {
  const now = new Date();
  req.requestTimeOfHit = now.toLocaleString();
  next();
};

module.exports = requestTimeOfHit;
