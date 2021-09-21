const jwt = require("jsonwebtoken");

const validateJwtCookie = async (req, res, next) => {
  const token = req.cookies.authtoken;
  if (!token) return res.status(401).send({ error: "Unauthorized" });
  try {
    const data = await jwt.verify(token, process.env.SECRET_KEY);
    if (data) {
      (req.body.id = data.id),
        (req.username = data.username),
        (req.email = data.email);
      next();
    } else {
      return res.status(503).json({ error: "some error occured" });
    }
  } catch (err) {
    return res.status(503).json({ error: "some error occured" });
  }
};
module.exports = { validateJwtCookie };
