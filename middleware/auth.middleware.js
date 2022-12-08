// const User = require("../models/models_twito/User");
const User = require("../models/model_twito/User");

const isAuthenticated = async (req, res, next) => {
  try {
    const username = req.headers.username;

    if (!username) {
      res.status(401).send("Connecte toi d'abord");
      return;
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(401).send("Vérifie l'orthographe");
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).send("ERROR auth");
    console.log(error);
  }
};

module.exports = isAuthenticated;
