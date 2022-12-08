const express = require("express");
const app = express();
const isAuthenticated = require("./middleware/auth.middleware");
const dto = require("./dto/dto_twito/twitos.dto");
const controllers = require("./controllers/twitos.controllers");
require("./database");

app.use(express.json());

//LES INFORMATIONS SUR L'UTILISATEUR
app.post("/users/user", dto.dtoCreateUserdto, controllers.CreateUsercontrollers);

app.get("/user/:username", dto.dtoGetUserdto, controllers.getUsercontrollers);
app.get("/test", isAuthenticated, controllers.test);

app.patch(
  "/user/:username",
  dto.dtoPatchUserdto,
  controllers.patchUsercontrollers
);

app.delete(
  "/user",
  isAuthenticated,
  dto.dtoDeleteUserdto,
  controllers.deleteUsercontrollers
);

//LES INFORMATIONS SUR LE SONDAGE
app.post(
  "/Twitoo/user/:username",
  dto.dtoCreateTwito,
  controllers.CreateTwitocontrollers
);

app.get(
  "/Twito/user/:username",
  dto.dtoGetTwito,
  controllers.GetTwitocontrollers
);
app.get(
  "/Twitoo/user/:username",
  dto.dtoGetTwitoo,
  controllers.GetTwitocontrollers
);
app.get("/test", isAuthenticated, controllers.test);

app.patch(
  "/Twitoedit/user/:username",
  dto.dtoPatchTwito,
  controllers.PatchTwitocontrollers
);

//LES INFORMATIONS SUR LES RÉPONSES AUX QUESTIONS DE L'UTILISATEUR
app.post(
  "/Twitoanswers/user/:username",
  dto.dtoCreateTwitosAnswer,
  controllers.CreateTwitosAnswerscontrollers
);

app.get(
  "/Twitooanswers/user/:username",
  dto.dtoGetTwitosAswer,
  controllers.GetTwitosAnswerscontrollers
);
app.get("/test", isAuthenticated, controllers.test);

app.patch(
  "/Twitoanswersedit/user/:username",
  dto.dtoPatchTwitosAnswer,
  controllers.PatchTwitosAnswerscontrolllers
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
