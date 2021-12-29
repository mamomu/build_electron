const router = require('express').Router();
const db = require('./../config/db');
const libSat = require('./../../../build/Release/nodesat.node');
const { data } = require('autoprefixer');

router.post('/finalizarVenda', async function (req, res) {
  const jsonDados = { ...req.body };
  console.log(JSON.stringify(jsonDados))
  try {
    db.raw(`Select Coalesce(Max(id),0) + 1 as id  from Venda v`).then(data => {
      const id = data[0].id;
      const id_turno = jsonDados.ID_TURNO;
      console.log(jsonDados)
      db.raw(`insert into Venda (Id, Id_Turno , Status_Venda, Data_Movimento, Cod_AV, Valor_PL, Valor_AV, Valor_DescPL, Valor_DescAV, Valor_Frete, Valor_Venda ) 
              values (${id},
                      ${id_turno},
                      '${'F'}',
                      '${new Date().toLocaleDateString()}',
                      '${jsonDados.COD_AV}',
                       ${jsonDados.VALOR_ITENS_PL},
                       ${jsonDados.VALOR_ITENS_AV},
                       ${jsonDados.VALOR_DESCONTO_PL},
                       ${jsonDados.VALOR_DESCONTO_AV},
                       ${jsonDados.VALOR_FRETE},
                       ${jsonDados.VALOR_TOTAL} ) `)
        .then((pcfin) => res.json(pcfin))
        .catch((err) => res.status(500).send(err));

      if (jsonDados.ID_VENDA !== 0) {
        db.raw(` update Venda Set Status_Venda = 'V' Where Id = ${jsonDados.ID_VENDA}`).then((pcfin) => res.json(pcfin))
      }


      let NumSeqIte = 1;
      jsonDados.ITENS.map((itens) => (
        db.raw(` insert into Venda_Item (Id, Num_SeqIte, Descricao, Cod_Ean, Sku, Valor_Unitario, Quantidade, Valor_DescBalcao, Valor_DescBalcaoRateio, Valor_Frete, Valor_Total, Item_AV)
         Values(
           ${id},
           ${NumSeqIte++},
           '${itens.DESCRICAO}',
           '${itens.EAN}',
           '${itens.SKU}',
           ${itens.VALOR_UNITARIO},
           ${itens.QUANTIDADE},
           ${itens.DESCONTO},
           ${itens.DESCONTO_RATEIO},
           ${itens.VALOR_FRETE},
           ${itens.VALOR_ITEM},
           ${itens.ITEM_AV}
         )`)
          .then((pcfin) => res.json(pcfin))
          .catch((err) => res.status(500).send(err))
      ))

      jsonDados.PAGAMENTO.map((pagamento) => (
        db.raw(` insert into Venda_Pagto (Id, Tipo_Pagto, Valor_Pagto, Nsu, Bandeira, Total_Parcelas)
                Values(
                  ${id},
                  '${pagamento.DESCRICAO_PAGAMENTO}',
                  ${pagamento.VALOR_PAGAMENTO},
                  '${pagamento.NSU_PAGAMENTO}',
                  '',
                  '${pagamento.NUM_PARCELA}')`)
          .then((pcfin) => res.json(pcfin))
          .catch((err) => res.status(500).send(err))
      ))

      jsonDados.PAGAMENTO.map((pagamento) => (
        db.raw(` insert into cxmov (Id_Venda, Id_Turno,Data_Movimento, Tipo_Mov, Tipo_Pagamento, Valor) values ( 
          ${id},
          ${id_turno},
          '${new Date().toLocaleDateString()}',
          'VENDA',
          '${pagamento.DESCRICAO_PAGAMENTO}',
           ${pagamento.VALOR_PAGAMENTO})`
        ).then((pagto) => res.json(pagto))
      ))


    })

    console.log(id)
  } catch (error) {

  }
  /*try {
      console.log(JSON.stringify(jsonDados))
      //const response = libSat.vendaSat(JSON.stringify(jsonDados));
      //res.send('"response":"venda finalizada com sucesso!"');

      //db.raw(` insert into `)

      jsonDados.PAGAMENTO.map((pagamento) => (
        db.raw(` insert into cxmov (Data_Movimento, Tipo_Mov, Tipo_Pagamento, Valor, Status_Caixa) values ( 
          '${new Date().toLocaleDateString()}',
          'VENDA',
          '${pagamento.DESCRICAO_PAGAMENTO}',
           ${pagamento.VALOR_PAGAMENTO},
           'A')`
         ).then((pagto) => res.json(pagto))       
      ))
    } catch (error) {
      console.log(error);
    } */
  //try {
  //  db.raw(`Select Coalesce(Max(id),0) + 1 as id  from Venda v`).then((response) =>
  //  res.json(pagto))
  /* db.raw(`insert into Venda (Id, Status_Venda, Data_Movimento, Cod_AV, Valor_PL, Valor_AV, Valor_DescPL, Valor_DescAV, Valor_Frete, Valor_Venda ) 
           values (${response},
                   '${'F'}',
                   '${new Date().toLocaleDateString()}',
                   '${jsonDados.COD_AV}',
                    ${jsonDados.VALOR_VENDA_PL},
                    ${jsonDados.VALOR_VENDA_AV},
                    ${jsonDados.VALOR_DESCONTO_PL},
                    ${jsonDados.VALOR_DESCONTO_AV},
                    ${jsonDados.VALOR_FRETE},
                    ${jsonDados.VALOR_TOTAL} ) `)) */
  // } catch (error) {

  // } 
});

module.exports = router;