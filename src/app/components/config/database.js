const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login_app'
});

conexion.connect((error) => {

    if (error) {
        console.error('Error conectando a MySQL:', error);
        return;
    }

    console.log('MySQL conectado correctamente');

});

module.exports = conexion;