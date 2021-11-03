const router = require('express').Router();
const libSat = require('./../../../build/Release/nodesat.node');

router.get('/consultarSat', async function (req, res) {
  const jsonDados = { ...req.body };
  try {
    const response = libSat.consultarSat();
    console.log(response)
    res.send(`{"response":"${response}"}`)
  } catch (error) {
    handleError(error);
  }

});

module.exports = router;