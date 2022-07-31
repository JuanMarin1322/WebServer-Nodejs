const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('../database/config');



class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';
        

        //Conecion a la base de datos 
        this.conectatDB();
        
        // Middlewares
        this.middlewares();

        this.app.use(cors());

        //Rutas de la applicacion 
        this.routes();
    }


    async conectatDB(){

        await dbConnection();
    }

    middlewares(){

        //CORS
        

        //Lectura y parseo del Body
        this.app.use( express.json() );


        // Dirrectorio publico
        this.app.use(express.static('public') );
     
         
    }

    routes() {

       this.app.use( this.usuariosRoutePath, require('../routes/usuarios'));
    }

    listen() {

        this.app.listen( this.port, () =>{
            console.log('Servidor Corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;