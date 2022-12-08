//MODEL DE SCHEMA DES INFORMATIONS SUR LE SONDAGE
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

//INFORMATIONS SUR LE SONDAGE
const schema = new Schema({
  text: String,

  isSurvery: Boolean,
  answers: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Twito", schema, "Twitos");
