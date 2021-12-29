const router = require('express').Router();

router.get('/consultaProduto/:EAN', async function (req, res) {
    switch (req.params.EAN) {
        case '7896714273006':
            res.send('{"Response":"Ok", "Item" : { ' +
                '  "VALOR_UNITARIO": 789.95, ' +
                '   "EAN": "7896714273006" ,'+
                '  "SKU": "PET-332532",' +
                '   "DESCRICAO": "Guarda-Roupa Casal Platinium 2PT Neve",' +
                '   "ARMAZEM": "03",' +
                '   "FRETE": 1,' +
                '   "ENTREGA": 3,' +
                '   "REVERSA_ID": "",' +
                '   "REVERSA_CLASSIFICACAO": ""}}');
            break;
        case 'PET-332532':
            res.send('{"VALOR_UNITARIO": 2000.95, ' +
                '  "SKU": "PET-115896",' +
                '   "DESCRICAO": "Sofá-Cama cinza 3 lugares",' +
                '   "ARMAZEM": "03",' +
                '   "FRETE": 1,' +
                '   "ENTREGA": 3,' +
                '   "REVERSA_ID": "",' +
                '   "REVERSA_CLASSIFICACAO": ""}');
            break;
        case '7891000294093':
            res.send('{"Response":"Ok", "Item" : { "VALOR_UNITARIO": 1300.00, ' +
                '  "SKU": "PET-113456",' +
                '   "EAN": "7891000294093" ,'+
                '   "DESCRICAO": "Cadeira Gamer Mobly",' +
                '   "ARMAZEM": "03",' +
                '   "FRETE": 1,' +
                '   "ENTREGA": 3,' +
                '   "REVERSA_ID": "",' +
                '   "REVERSA_CLASSIFICACAO": ""}}');
            break;
        default:
            res.send('{"Response":"Produto não encontrado"}');
    }
});

module.exports = router;
