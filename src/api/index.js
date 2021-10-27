const app = require('express')()
const SatTef = require('bindings')('./../../../build/Release/nodesat');
const path = require('path');
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use('/', [
    require('./../api/models/sangriaSuprimento')
  ])
  app.listen(3333, () => {
      SatTef.carregarDLL('C:\\sistemas\\lerdllimp\\Win64\\Release\\libmobly.dll'); 
      console.log('Backend Executando...')
  })
  
  module.exports = app