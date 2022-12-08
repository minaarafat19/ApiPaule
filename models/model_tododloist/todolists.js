const { model, Schema } = require('mongoose') ;

const todolistsSchema = new Schema({
    user:String,
    todos:[String],
    createdAt: {
        type:Date,
        //donner valeur par défaut, ici date d'aujourd'hui au cas ou
        default:Date.now
    }

});

module.exports= model('Todolists', todolistsSchema, 'todolists');