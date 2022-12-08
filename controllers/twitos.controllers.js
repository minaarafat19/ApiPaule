const Twito = require("../models/model_twito/Twito");
const User = require("../models/model_twito/User");
const TwitosAnswer = require("../models/model_twito/TwitosAnswers");

//AUTHENTICATED
const test = async (req, res) => {
  try {
    console.log("user", req.user);

    res.status(200).json({ valueOfHeader: req.headers.username });
  } catch (error) {
    res.status(500).send("Une erreur est survenue");
  }
};

//LES FONCTIONS DE L'UTILISATEUR (userName) QUI VIENNENT APRÈS LES MIDDLEWARE
const CreateUsercontrollers = async (req, res, next) => {
  try {
    const user = req.body.username;

    const userNameExist = await User.exists({ userName: user });
    if (userNameExist) {
      res.status(400).send("UserName already have a user");
      return;
    }

    const newuserName = new User();
    newuserName.userName = user;
    console.log("newUser", newuserName);

    await newuserName.save();
    console.log("newUser", newuserName);

    res.sendStatus(204);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("As error has occured");
  }
};

const getUsercontrollers = async (req, res, next) => {
  try {
    const user = req.params.username;

    const userName = await User.findOne({ userName: user });
    if (!userName) {
      res.status(404).send("User already have a username");
      return;
    }

    res.status(200).json({ userName: user });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("As error has occured ");
  }
};

const patchUsercontrollers = async (req, res, next) => {
  try {
    const username = req.params.username;
    const data = req.body.username;

    const user = await User.find({ userName: username });
    user.userName = data;
    //await user.save();

    console.log("userName", username);
    if (!username) {
      res.status(404).send("User don't has a userName");
      return;
    }

    if (!data?.length) {
      res.status(400).send("you have to provide a user");
      return;
    }

    user.userName = data;
    //await user.save();

    res.status(200).json({ userName: data });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("une erreur est survenue");
  }
};
const deleteUsercontrollers = async (req, res, next) => {
  try {
    const user = req.user;

    const username = await User.findOne({ username: user.username });

    if (!username) {
      res.status(404).send("user has no name");
      console.log(error);
    }
    await username.remove();
    res.status(200).send("succeedd");
  } catch (error) {
    console.log(error);
  }
};

//LES FONCTIONS DU TEXT  QUI VIENNENT APRÈS LES MIDDLEWARES

const CreateTwitocontrollers = async (req, res, next) => {
  try {
    const user = req.params.username;
    const Text = req.body.text;
    const isSurvery = req.body.isSurvery;
    const answers = req.body.answers;

    const userNameExist = await User.findOne({ username: user });
    if (!userNameExist) {
      res.status(400).send("UserName already have a user");
      return;
    }

    const textingExist = await Twito.exists(
      { text: Text },
      { user: userNameExist }
    );
    if (!textingExist) {
      res.status(400).send("The text already has a message");
      return;
    }

    const booleanExist = await Twito.exists(
      { text: Text },
      { user: user },
      { isSurvery: isSurvery }
    );
    if (!booleanExist) {
      res.status(400).send("The boolean has already given an answer");
    }

    const newtext = new Twito();
    newtext.text = Text;
    newtext.user = userNameExist;
    newtext.isSurvery = isSurvery;
    newtext.answers = answers;

    //newboolean.user = userNameExist;
    console.log("newTwito", newtext);

    await newtext.save();
    console.log("newTwito", newtext);
    console.log(isSurvery);
    console.log(answers);

    res.sendStatus(204);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("As error has occured");
  }
};

const GetTwitocontrollers = async (req, res, next) => {
  try {
    const user = req.params.username;
    const Text = req.params.text;
    const isSurvery = req.body.isSurvery;

    const twito = await Twito.find();
    const boole = await Twito.findOne(
      { user: user.id },
      { text: 1, answers: 1 }
    );

    const myUser = await User.findOne(
      { user: user.id },
      { text: 1, isSuvery: 1 }
    );

    const twitos = await Twito.findOne(
      { user: myUser.id },
      { text: 1, isSurvery: 1 }
    );
    if (!twitos) {
      res.status(400).send("User already created a tweet");
      return;
    }

    //const textingExist = await Twito.exists({ text: Text });

    res.status(200).json(twito);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("As error has occured");
  }
};

const PatchTwitocontrollers = async (req, res, next) => {
  try {
    const username = req.params.username;
    const data = req.body.text;

    const twito = await Twito.find({ user: User.id }, { test: 1 });
    //twito.text = data;
    //await twito.save();

    console.log("twito", twito);
    if (!twito) {
      res.status(404).send("User don't has a twito");
      return;
    }

    if (!data?.length) {
      res.status(400).send("you have to provide a twito");
      return;
    }

    res.status(200).json({ text: data });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("une erreur est survenue");
  }
};

//LES RÉPONSES AUX QUESTIONS DE L'UTILISATEUR

const CreateTwitosAnswerscontrollers = async (req, res, next) => {
  try {
    const answers = req.body.answer;

    const answerExist = await TwitosAnswer.exists({ answer: answers });
    if (answerExist) {
      res.status(400).send("The user has already answered the question");
      return;
    }

    const newanswer = new TwitosAnswer();
    newanswer.answer = answers;
    console.log("newTwitosAnswers", newanswer);

    await newanswer.save();
    console.log("newTwitosAnswers", newanswer);

    res.sendStatus(204);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("As error has occured");
  }
};

const GetTwitosAnswerscontrollers = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = req.params.username;

    const answer = await TwitosAnswer.find({ user: username.id });

    if (!user) {
      res.status(404).send("User already have a username");
      return;
    }

    res.status(200).json(answer);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("As error has occured ");
  }
};

const PatchTwitosAnswerscontrolllers = async (req, res, next) => {
  try {
    const userName = req.params.username;
    const data = req.body.username;

    const answer = await TwitosAnswer.find({ userName: userName.id });
    answer.userName = data;

    console.log("userName", userName);
    if (!userName) {
      res.status(404).send("User don't has a userName");
      return;
    }

    /*if (!data?.length) {
      res.status(400).send("you have to provide a user");
      return;
    }*/

    /*answer.userName = data;
    await answer.save();*/

    res.status(200).json({ answer });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("une erreur est survenue");
  }
};
module.exports = {
  test,
  CreateUsercontrollers,
  getUsercontrollers,
  patchUsercontrollers,
  deleteUsercontrollers,
  CreateTwitocontrollers,
  GetTwitocontrollers,
  PatchTwitocontrollers,
  CreateTwitosAnswerscontrollers,
  GetTwitosAnswerscontrollers,
  PatchTwitosAnswerscontrolllers,
};
