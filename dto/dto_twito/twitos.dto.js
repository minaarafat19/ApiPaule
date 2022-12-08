const Twito = require("../../models/model_twito/Twito");
const User = require("../../models/model_twito/User");
const TwitosAnswer = require("../../models/model_twito/TwitosAnswers");

// LES MIDDLEWARES DE L'UTILISATEUR

//create ou post
const dtoCreateUserdto = (req, res, next) => {
  try {
    console.log(req.body);
    const user = req.body.username;

    if (!user) {
      res.status(400).send("Username missing");
      return;
    }

    next();
  } catch (error) {
    res.status(500).send("An error has occurred");
  }
};

const dtoGetUserdto = (req, res, next) => {
  try {
    const userName = req.params.username;

    if (!userName) {
      res.status(400).send("Username missing");
      return;
    }

    next();
  } catch (error) {
    res.status(500).send("As error has occured");
  }
};

const dtoPatchUserdto = (req, res, next) => {
  try {
    const userName = req.params.username;
    const data = req.body.username;

    if (!userName.length) {
      res.status(400).send("User can't be empty");
      return;
    }

    if (!data.length) {
      res.status(400).send("username can't be empty");
      return;
    }

    next();
  } catch (error) {
    res.status(500).send("ERROR");
  }
};

const dtoDeleteUserdto = (req, res, next) => {
  try {
    const user = req.user;

    next();
  } catch (error) {
    res.status(500).send("Une erreur est survenue");
  }
};

//MIDDLEWARES DU SONDAGE

const dtoCreateTwito = (req, res, next) => {
  try {
    const userName = req.params.userName;
    const Text = req.params.text;
    const isSurvery = req.body.isSurvery;
    const answers = req.body.answers;

    const user = User.find({ userName: userName });

    if (!user) {
      res.status(400).send("Username missing");
      return;
    }

    /* if (!Text) {
      res.status(400).send("Text missing");
      return;
    }*/

    if (isSurvery == true || isSurvery == false) {
      console.log(isSurvery);
    }

    if (!answers) {
      res.status(400).send("Answers missing");
      console.log(answers);
    }

    next();
  } catch (error) {
    res.status(500).send("Une erreur est survenue");
  }
};

const dtoGetTwito = (req, res, next) => {
  try {
    const userName = req.params.userName;
    const Text = req.body.text;
    const isSurvery = req.body.isSurvery;
    const answers = req.body.answers;

    const user = User.find();

    //const bool = Twito.find();

    if (!user) {
      res.status(400).send("User missing");
      return;
    }

    /*if (!Text) {
      res.status(400).send("Text missing");
      return;
    }*/

    next();
  } catch (error) {
    res.status(500).send("Une erreur est survenue");
  }
};
const dtoGetTwitoo = (req, res, next) => {
  try {
    const username = req.params.username;
    console.log(req.params);

    if (!username) {
      res.status(400).send("Answers missing");
      return;
    }

    next();
  } catch (error) {
    res.status(500).send("An error has occurred");
  }
};

const dtoPatchTwito = (req, res, next) => {
  try {
    const userName = req.params.userName;
    const data = req.body.text;

    const twito = Twito.findOne({ user: userName });

    if (!data?.length) {
      res.status(400).send("text can't be empty");
      return;
    }

    next();
  } catch (error) {
    console.log("error", error);
    res.status(500).send("ERROR");
  }
};

//LES MIDDLEWARES DES RÉPONSES

const dtoCreateTwitosAnswer = (req, res, next) => {
  try {
    const answers = req.body.answer;
    console.log(req.body);

    if (!answers) {
      res.status(400).send("The user did not answer the question");
      return;
    }

    next();
  } catch (error) {
    res.status(500).send("An error has occurred");
  }
};

const dtoGetTwitosAswer = (req, res, next) => {
  try {
    const username = req.params.username;
    console.log(req.params);

    if (!username) {
      res.status(400).send("Answers missing");
      return;
    }

    next();
  } catch (error) {
    res.status(500).send("An error has occurred");
  }
};
const dtoPatchTwitosAnswer = (req, res, next) => {
  try {
    const userName = req.params.username;
    const data = req.body.username;

    const answer = TwitosAnswer.findOne({ user: userName });

    if (!userName.length) {
      res.status(400).send("User can't be empty");
      return;
    }

    /*if (!data?.length) {
      res.status(400).send("username can't be empty");
      return;
    }*/

    next();
  } catch (error) {
    console.log("error", error);
    res.status(500).send("ERROR");
  }
};
module.exports = {
  dtoCreateUserdto,
  dtoGetUserdto,
  dtoPatchUserdto,
  dtoDeleteUserdto,
  dtoCreateTwito,
  dtoGetTwito,
  dtoGetTwitoo,
  dtoPatchTwito,
  dtoCreateTwitosAnswer,
  dtoGetTwitosAswer,
  dtoPatchTwitosAnswer,
};
