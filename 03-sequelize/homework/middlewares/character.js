const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

function validatePost(body){
  if(!body.code || !body.name || !body.hp || !body.mana) return true;
  else return false;
};

router.post("/", async (req, res) => {
  let error = validatePost(req.body);
  if(error) res.status(404).send("Falta enviar datos obligatorios");
  // Character.create({...req.body})
  //   .then(pj => res.status(201).json(pj))
  //   .catch(err => res.status(404).send("Error en alguno de los datos provistos"));
  try{
    let pj = await Character.create({...req.body});
    if(pj) res.status(201).json(pj);
  }catch(e){
    res.status(404).send("Error en alguno de los datos provistos");
  }
});

router.get("/", async (req, res) => {
  let {race} = req.query;
  try{
    if(!race){
      res.status(200).json(await Character.findAll());
    }else{
      let filtro = await Character.findAll({where: {race}});
      if(filtro.length > 0) res.status(200).json(filtro);
    }
  }catch(err){
    res.status(400).json({error: err})
  }
});

module.exports = router;