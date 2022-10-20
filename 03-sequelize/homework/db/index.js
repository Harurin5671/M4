const { Sequelize, Op } = require('sequelize');
const modelCharacter = require('./models/Character.js');
const modelAbility = require('./models/Ability.js');
const modelRole = require('./models/Role.js');

const db = new Sequelize('postgres://postgres:Harurin567123@@localhost:5432/henry_sequelize', {
  logging: false,
});

modelCharacter(db);
modelAbility(db);
modelRole(db);

let {Character, Ability, Role} = db.models;

Character.hasMany(Ability);
Ability.belongsTo(Character);
Character.belongsToMany(Role, {through: "CharacterRole"});
Role.belongsToMany(Character, {through: "CharacterRole"});

module.exports = {
  ...db.models,
  db,
  Op
}