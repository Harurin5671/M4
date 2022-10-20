const { Router } = require('express');
const { Ability } = require('../db');
const router = Router();

function validateAbility(body){
  if(!body.name || !body.mana_cost) return true;
  else return false;
}

router.post("/", (req, res) => {
  let error = validateAbility(req.body);
  if(error) res.status(404).send("Falta enviar datos obligatorios");
  else Ability.create()
});

module.exports = router;