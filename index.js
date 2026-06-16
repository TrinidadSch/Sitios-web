const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3800;

/*El siguiente codigo nos permite identificar
cual es la base de datos que se va a ocupar*/
require('dotenv').config();

const db =mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

/*El siguiente codigo nos ayuda a comprobar si la
conexion se realiso exitosamente o no y da la razon 
de porque*/
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Se conecto la base de datos MySQL');
});


app.get("/api/pacientes", function (req, res){
    const sql = 'SELECT * FROM reporte';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

/*El siguiente codigo nos permite comprobar si se 
pueden entregar los datos que se piden*/
/*
app.get("/api/pacientes/tables/reporte", (req, res) => {
    connection.query('SELECT * FROM reporte', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error obteniendo datosWHERE id = ?');
            return;
        }
        res.json(results[0]); 
        console.log("funciono");
    });
});
*/
app.use(express.static("public"));

/*
const categorias = "SELECT * FROM categoria";
db.query(categorias,function(error,lista){
    if(error){
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
    console.log(lista);
});

app.use(express.static("public"));
*/

/*Con el validaremos los datos para poder
integrarlos a la base de datos*/
/*
app.post("/validar", function(req,res){
    const datos = req.body;

    let nombre = datos.Nom;
    let altura = datos.Alt;
    let ubicacion = datos.Ubica;
    let dificultad = datos.Dific;
    let tiempo = datos.Tiemp;
    let estacionamiento = datos.Estacio;
    let Acceso = datos.Acces;

    let registrar = "INSERT INTO tabla_usuarios (nombre, altura_msnm, ubicacion, dificultad, tiempo_promedio, descripcion, estanionamientos, accesos) VALUES ('"+nombre+"','"+altura+"','"+ubicacion+"','"+dificultad+"','"+tiempo+"','"+estacionamiento+"','"+Acceso+"')"

    conexion.query(registrar, function(error){
        if(error){
            throw error;
        }else{
            console.log("Datos almacenados correctamente");
        }
    });
});*/

/*El siguiente codigo permite que se ejecute desde 
el esta pestaña a la pagina "index.html" y a su vez
permite que los datos de la base de datos puedan 
estar en el HTML y a su paso pueda estar en el 
sitio web*/

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

