//MODEL DE SCHEMA DE L'UTILISATEUR
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

//INFORMATION DE L'UTILISATEUR
const schema = new Schema({
  userName: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", schema, "users");
