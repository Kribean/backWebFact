require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

//routes
const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo');


//connexion to database
mongoose.connect(process.env.DATABASE_ACCESS,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  const app = express();
  app.use(express.json());

  //give access
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
//connexion to routes
app.use('/api/auth',userRoutes); //route to access to user
app.use('/api/todo', todoRoutes); //route to access todo item
  module.exports = app;