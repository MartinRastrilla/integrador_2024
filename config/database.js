const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'integrador_2024'
  });
  
  connection.connect((err) =>{
    if (err) {
        console.error("Error al conectar con las Base de Datos");
        return;
    }
    console.log("Conectado a la Base de Datos");
  });

module.exports = connection;