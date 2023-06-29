const Todo = require("../models/Todo");

//create toto, title should be mendatory
exports.createTodo = (req, res, next) => {
  const { nickname, description, title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "titre non renseigné" });
  }
  const todo = new Todo({
    userId: req.token.userId,
    nockname: nickname,
    description: description,
    title: title,
  });
  todo
    .save()
    .then(() => {
      Todo.find({ userId: req.token.userId })
        .then((todos) => {
          res.status(200).json(todos);
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
  const { title, description, state } = req.body;
  if (!title || !description || !state) {
    return res.status(400).json({ error: "bad parameters" });
  }
  Todo.findOneAndUpdate(
    { _id: req.params.idTodo },
    { title: title, description: description, state: state, createAndUpdateDate: new Date() },
    { new: true } //return new version
  )
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      } else {
        Todo.find({ userId: req.token.userId })
          .then((todos) => {
            return res.status(200).json(todos);
          })
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
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
