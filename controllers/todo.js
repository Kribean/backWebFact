const Todo = require("../models/Todo");

//create toto, title should be mendatory
exports.createTodo = (req, res, next) => {
  const { description, title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "titre non renseigné" });
  }
  const todo = new Todo({
    userId: req.token.userId,
    description: description,
    title: title,
    createAndUpdateDate: new Date(),
  });

  todo
    .save()
    .then(() => {
      Todo
        .find({ userId: req.token.userId })
        .sort({ createAndUpdateDate: -1 })
        .then((todos) => {
          return res.status(200).json(todos);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

//get all todo when you go on main page
exports.getAllTodos = (req, res, next) => {
  Todo.find({ userId: req.token.userId })
    .sort({ createAndUpdateDate: -1 })
    .then((todos) => {
      return res.status(200).json(todos);
    })
    .catch((error) => res.status(400).json({ error }));
};

//get one todo when you go on main page
exports.getOneTodo = (req, res, next) => {
  Todo.findOne({ _id: req.params.idTodo })
    .then((todos) => res.status(200).json(todos))
    .catch((error) => res.status(400).json({ error }));
};

//modify one todo
exports.modifyOneTodo = (req, res, next) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: "bad parameters" });
  }
  Todo.updateOne(
    { _id: req.params.idTodo },
    { description: description, createAndUpdateDate: new Date() }
  )
    .then((updatedTodo) => {
      return res.status(200).json({ message: "message modifié" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//modify state
exports.modifyTodoState = (req, res, next) => {
  const { state } = req.body;
  if (!state) {
    return res.status(400).json({ error: "bad parameters" });
  }
  Todo.updateOne(
    { _id: req.params.idTodo },
    { state: state, createAndUpdateDate: new Date() }
  )
    .then(() => {
      return res.status(200).json({ message: "state modifié" });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

//delete one todo
exports.deleteOneTodo = (req, res, next) => {
  Todo.deleteOne({
    _id: req.params.idTodo,
  })
    .then(() => res.status(200).json({ message: "deleted todo!" }))
    .catch((error) => res.status(400).json({ error }));
};
