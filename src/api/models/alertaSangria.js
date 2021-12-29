const router = require('express').Router();
const db = require('./../config/db');

router.get('/alertasangria/:idTurno', async function (req, res) {
    let id = req.params.idTurno;
    db.raw(`Select Sum(Valor) as Valor 
            From cxmov where Tipo_Pagamento = "Dinheiro" 
            And Tipo_Mov = "VENDA"
            And Id_Turno = ${id} `)
      
      .then((param) => {        
        res.json(param)
      }).first
      .catch((err) => res.status(500).send(err));
  });
  
  module.exports = router;