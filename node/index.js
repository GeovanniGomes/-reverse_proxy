const express = require('express')
const app = express()
const port = 3000

const { create_table, insert_data, get_name } = require('./database');
let name;

create_table();
insert_data();

get_name((name) => {
    name = name;
    console.log('Nome obtido:', name);
});

name = "Ultimo registro"
app.get('/', (req,res) => {
    res.send('<h1>Full Cycle</h1><br> Nome registrado:' + name + '</br>');
});
app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
});
