const express = require('express')
const app = express()
const port = 3000

const { create_table, insert_data, get_all } = require('./database');
let name;

create_table();


app.get('/', (req, res) => {
    insert_data();
    get_all((names) => {
        let response = '<h1>Full Cycle</h1><br> Nomes registrados:<br>';
        names.forEach((item) => {
            response += `ID: ${item.id}, Nome: ${item.name}<br>`;
        });
        res.send(response);
    });
});
app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
});
