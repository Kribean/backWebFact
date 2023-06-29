require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User')


exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password,10) //hashage du code avec 10 tours
    .then(hash=>{
        const user = new User({
            nickname: req.body.nickname,
            password:hash
        });
        user.save()
        .then(()=>res.status(201).json({message:'Utilisateur créé!'}))
        .catch(error => res.status(400).json({error}))
            
        
    })
    .catch(error => res.status(500).json({error}))

};


exports.login = (req, res, next) => {
    const {nickname, password} = req.body;

    User.findOne({ nickname: nickname })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(password, user.password) //compare passwords
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              nickname:user.nickname,
              token: jwt.sign(
                  {userId:user._id},
                  process.env.SECRET_KEY,
                  {expiresIn: '24h'}
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
