//TOUTES LES GROSSES FONCTIONS QUI VIENNENT APRES LE MIDDLEWARE

const Todolist = require("../models/model_tododloist/todolists");

const getUserTodolist = async (req, res, next) => {
  async (req, res) => {
    try {
      const user = req.params.user;

      const userTodos = await Todolists.findOne(
        { user: user },
        { _id: 0, todos: 1 }
      );
      if (!userTodos) {
        res.status(400).send("User already have a todolist");
        return;
      }

      if (!userTodos) {
        res.status(404).send("No user todolist found");
        return;
      }

      res.status(200).json({ todos: userTodos.todos });
    } catch (error) {
      console.log("error", error);
      res.status(500).send("une erreur est survenue");
    }
  };
};

const CreateUserTodolist = async (req, res, next) => {
  async (req, res) => {
    try {
      const user = req.body.user;

      const userExist = await Todolist.exists({ user: user });
      if (userExist) {
        res.status(400).send("User already have a todolist");
        return;
      }

      const newTodolist = new Todolists();
      newTodolist.user = user;
      newTodolist.todos = [];

      await newTodolist.save();

      res.sendStatus(204);
    } catch (error) {
      res.status(500).send("une erreur est survenue");
    }
  };
};

const PatchUserTodolist = async (req, res, next) => {
  async (req, res, next) => {
    try {
      const user = req.params.user;
      const data = req.body.todos;

      const userTodos = await Todolists.findOne({ user: user });

      console.log("userTodos", userTodos);
      if (!userTodos) {
        res.status(404).send("User don't has a todolist");
        return;
      }

      if (!data?.length) {
        res.status(400).send("you have to provide a todolist");
        return;
      }

      userTodos.todos = data;
      await userTodos.save();

      res.status(200).json({ todos: userTodos.todos });
    } catch (error) {
      console.log("error", error);
      res.status(500).send("une erreur est survenue");
    }
  };
};

const DeleteUserTodolist = async (req, res, next) => {
  async (req, res) => {
    try {
      const user = req.params.user;
      const index = req.params.index;

      const userTodos = await Todolist.findOne(
        { user: user },
        { _id: 1, todos: 1 }
      );

      if (!userTodos) {
        res.status(404).send("tu n'as pas de todos");
      }

      //SUPPRIMER LE PROCHAIN ELEMENT A PARTIR DE L INDEX

      userTodos.todos.splice(parseInt(index), 1);
      userTodos.todos.splice(2, 1);

      userTodos.save();

      res.status(200).send("you deleted one TODO");
      return;
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports = {
  getUserTodolist,
  CreateUserTodolist,
  PatchUserTodolist,
  DeleteUserTodolist,
};
