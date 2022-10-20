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
  let {race, age} = req.query;
  try{
    if(!race){
      res.status(200).json(await Character.findAll());
    }else{
      let filtro = await Character.findAll({
        where:{race, age}
        // where: {
        //   [Op.and]: [{race}, {age}]
        // }
      });
      if(filtro.length > 0) res.status(200).json(filtro);
    }
  }catch(err){
    res.status(400).json({error: err});
  }
});

router.get("/young", async (req, res) => {
  try{
    let personajes = await Character.findAll({
      where: {
        age: {
          // [Op.lt]: 25, -----> toma un valor < 25
          [Op.lt]: 25
        }
      }
    });
    res.json(personajes);
  }catch(err){
    res.send(err);
  }
});

router.get("/:code", (req, res) => {
  let {code} = req.params;
  if(!code){
    res.status(400).send(`El código ${code} no corresponde a un personaje existente`);
  }else{
    Character.findByPk(code)  
      .then(pj => res.status(200).json(pj))
      .catch(err => res.status(400).json({err}));
  }
});

router.put("/:attribute", (req, res) => {
  let {attribute} = req.params;
  let {value} = req.query;
  if(!attribute || !value) res.status(400).json({err: "Missing params or query"});
  Character.update({[attribute]: value}, {where:{
    [attribute]: null
  }}).then(res.send("Personajes actualizados")).catch(err => res.status(400).json({err}));
});

module.exports = router;