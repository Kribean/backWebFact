const mongoose = require('mongoose');


//définition des paramètres liées à l'utilisateur qui sera enregistré en base de donnée
const userSchema = mongoose.Schema({
    nickname : {type: String, required:true, unique: true},
    password : {type: String, required:true},
});

module.exports = mongoose.model('User',userSchema);