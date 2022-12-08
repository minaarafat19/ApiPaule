//MODEL DE SCHEMA POUR LES REPONSES DE L'UTILISATEUR
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

//LES REPONSES DE L'UTILISATEUR
const schema = new Schema({
  answer: String,

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("TwitosAnswer", schema, "twitoAnswers");
