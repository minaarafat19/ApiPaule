//TOUT LES MIDDLEWARE

const Todolist = require("../../models/model_tododloist/todolists");

const dtogetUserTodolist = (req, res, next) => {
  "/todo-lists/user/:user/",
    async (req, res, next) => {
      try {
        const user = req.params.user;

        if (!user) {
          res.status(400).send("Username missing");
          return;
        }

        next();
      } catch (error) {
        res.status(500).send("Une erreur est survenue");
      }
    };
};

//create = post
const dtoCreateUserTodolist = (req, res, next) => {
  "/todo-lists",
    async (req, res, next) => {
      try {
        const user = req.body.user;

        if (!user) {
          res.status(400).send("Username missing");
          return;
        }

        next();
      } catch (error) {
        res.status(500).send("Une erreur est survenue");
      }
    };
};

const dtoPatchUserTodolist = (req, res, next) => {
  "/todo-lists/user/:user",
    (req, res, next) => {
      try {
        const user = req.params.user;
        const data = req.body.todos;

        if (!user.length) {
          res.status(400).send("User can't be empty");
          return;
        }

        if (!data.length) {
          res.status(400).send("Todos can't be empty");
          return;
        }

        next();
      } catch (error) {
        res.status(500).send("ERROR");
      }
    };
};

const dtoDeleteUserTodolist = (req, res, next) => {
  "/todo-lists/user/:user/index/:index",
    async (req, res, next) => {
      //Middleware
      try {
        const { user, index } = req.params;

        if (!user?.length) {
          res.status(400).send("Envoie un nom d'utilisateur non vide ");
          return;
        }

        if (!parseInt(index) || parseInt(index) <= -1) {
          res.status(404).send("donne un index superieur ou egal à 0");
        }

        next();
      } catch (error) {
        res.status(500).send("Une erreu est survenue");
      }
    };
};

module.exports = {
  dtogetUserTodolist,
  dtoCreateUserTodolist,
  dtoPatchUserTodolist,
  dtoDeleteUserTodolist,
};
