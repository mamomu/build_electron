const app = require('express')()
const SatTef = require('bindings')('./../../../build/Release/nodesat');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const dest = path.resolve(__dirname,'libmobly.dll')

app.use('/', [
    require('./../api/models/sangriaSuprimento'),
    require('./../api/models/consultaSat')
  ]) 
  app.listen(3333, () => {
      SatTef.carregarDLL(dest); 
      console.log('Backend Executando...')
  })
  
  module.exports = app