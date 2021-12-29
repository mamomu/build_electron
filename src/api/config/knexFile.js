const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pdv.db');

db.serialize( function() {
    db.run("Create Table if not exists cxmov(Id_Venda Integer, Id_Turno Integer Integer, Data_Movimento datetime, Tipo_Mov Text, Tipo_Pagamento Text, Valor Real(18,4))")
    db.run(`Create Table if not exists param(Num_Sequen Integer, Valor_Sangria Real(18,4), Codigo_AtvSat Text, Cod_AssSat Text, Dest_dllSat Text, Regime_Tributario Char(1), ambiente_Sat Char(1),
           Num_Caixa Text, Descricao_Empresa Text, Fantasia Text, Endereco_Empresa Text, CEP Text, CNPJ Text, IE Text, Fone Text)`)
    db.run(`Create Table if not exists turno(Id_Turno Integer, Status_Caixa Char(1), Data_Movimento datetime, Num_caixa Integer, Cod_Operador Integer, DataHora_Abertura datetime, DataHora_Fechamento datetime)`)
    db.run(`Create Table if not exists vendas_xml(Id_Venda Integer, Data_Movimento datetime, xml_venda Text, xml_cancelamento Text)`)
    db.run(`Create Table if not exists Venda(Id Integer Primary Key, Id_Turno Integer, Status_Venda Char(1), Data_Movimento DateTime, Cod_Vendedor Text, Cod_Operador Text, Cod_AV Text, Valor_PL Real(18,4), Valor_AV Real(18,4), Valor_DescPL Real(18,4), Valor_DescAV Real(18,4), Valor_Frete Real(18,4), Valor_Venda Real(18,4))`)
    db.run(`Create Table if not exists Venda_Item(Id Integer, Num_SeqIte Integer , Descricao Text,Cod_Ean Text, Sku Text, Valor_Unitario Real(18,4), Quantidade Integer,Valor_DescVourche Real(18,4), Valor_DescSite Real(18,4), Valor_DescValeTroca Real(18,4), Valor_DescBalcao Real(18,4), Valor_DescBalcaoRateio Real(18,4), Valor_Frete Real(18,4), Valor_Total Real(18,4), Item_Av Boolean, KEY_ReservaProdBob Text, Cod_Vendedor Integer,PRIMARY KEY(Id, Num_SeqIte) ,FOREIGN KEY(Id) REFERENCES Venda(Id))`)
    db.run(`Create Table if not exists Venda_Pagto(Id Integer Primary Key, Tipo_Pagto Text, Valor_Pagto Real(18,4), Nsu Text, Bandeira Text, Total_Parcelas Integer, FOREIGN KEY(Id) REFERENCES Venda(Id))`)
    db.run(`Create Table if not exists encerramento_caixa(Id_Turno Integer, Tipo_Pagto Text, Valor Real(18,4))`)
})

db.close;

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: "./pdv.db"
    },
    migrations: {
        tablename: 'knex_migations'
    }
}