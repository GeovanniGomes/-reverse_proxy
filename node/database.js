const mysql = require('mysql2')

const config = {
    host: 'database',
    user: 'root',
    password: 'root',
    database:'nodedb',
};

const nomes = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Mariana', 'Lucas', 'Laura', 'Fernando', 'Isabela'];
function gerarNomeAleatorio() {
    const indice = Math.floor(Math.random() * nomes.length);
    return nomes[indice];
}

function create_table(){
    const connection = mysql.createConnection(config);
    const sql = `CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
    );`;

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

    let novo_nome = gerarNomeAleatorio()
    const connection = mysql.createConnection(config);
    const sql = `INSERT INTO people(name) VALUES (?)`;
    connection.query(sql, [novo_nome], (error, results, fields) => {
        if (error) {
            console.error('Erro ao inserir dados:', error);
            return;
        }
        console.log('Dados inseridos com sucesso!');
        connection.end();
    });
}

function get_all(callback){
    const connection = mysql.createConnection(config);
    const sql = `SELECT *FROM people `;
    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error('Erro ao obter nome:', error);
            connection.end();
            return;
        }
        const names = results.length > 0 ? results: null;
        callback(names);
        connection.end();
    });
}

module.exports = {
    create_table,
    insert_data,
    get_all
};