const mysql = require('mysql')

const config = {
    host: 'database',
    user: 'root',
    password: 'root',
    database:'nodedb',
    port:3306
};

function create_table(){
    const connection = mysql.createPool(config);
    const database = `USE nodedb;`
    
    const sql = `CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
    );`;

    connection.query(database, (error, results, fields) => {
        if (error) {
            console.error('Erro ao selecionar banco de dados:', error);
            return;
        }
        console.log('Banco selecionado!');
    });

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error('Erro ao criar tabela:', error);
            return;
        }
        console.log('Tabela criada com sucesso!');
        connection.end();
    });
}

function insert_data(){
    const connection = mysql.createPool(config);
    const sql = `INSERT INTO people(name) VALUES ('Geovani Gomes')`;
    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error('Erro ao inserir dados:', error);
            return;
        }
        console.log('Dados inseridos com sucesso!');
        connection.end();
    });
}

function get_name(callback){
    const connection = mysql.createPool(config);
    const sql = `SELECT name FROM people LIMIT 1`;
    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error('Erro ao obter nome:', error);
            connection.end();
            return;
        }
        const name = results.length > 0 ? results[0].name : null;
        callback(name);
        connection.end();
    });
}

module.exports = {
    create_table,
    insert_data,
    get_name
};