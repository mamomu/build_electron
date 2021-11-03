const router = require('express').Router();
const libSat = require('./../../../build/Release/nodesat.node');

router.post('/sangriaSuprimento', async function (req, res) {
    const jsonDados = { ...req.body };
    try {
        console.log(JSON.stringify(jsonDados))
        const response = libSat.impComprovante(JSON.stringify(jsonDados));
        res.json(`{"response":"${response}"}`)
      } catch (error) {
        handleError(error);
      } 
   
  });

module.exports = router;