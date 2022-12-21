const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const {connection} = require('../database/config');
class Server {

    constructor(){
        this.app = express();
        this.port=process.env.PORT;


        this.usuariosPath =         '/api/user';
        this.adminsPath =           '/api/administrador';
        this.authPath =             '/api/auth';
        this.copropietarioPath =    '/api/copropietario';
        this.condominioPath =       '/api/condominio';
        this.edificioPath =         '/api/edificio';
        this.domicilioPath =        '/api/domicilio';
        this.areasComunesPath =     '/api/areasComunes';
        this.reservaAreasComunes =  '/api/reservaAreasComunes';
        this.uploads =              '/api/uploads';
        this.adminDeudas =          '/api/AdministracionDeudas';
        this.adminExpensas =        '/api/AdministracionExpensas';
        // Conectar a base de datos

        

        //Middlewares
        this.middleware();

        this.routes();
    }





    middleware(){
        //CORS
        this.app.use( cors());

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Publico
        this.app.use(express.static('public'));

        // FileUpload - Carga de Archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }


    routes() {

        this.app.use(this.usuariosPath,       require('../routes/usuarios'));
        this.app.use(this.authPath,           require('../routes/auth'));
        this.app.use(this.adminsPath,         require('../routes/administrador'));
        this.app.use(this.copropietarioPath,  require('../routes/copropietario'));
        this.app.use(this.condominioPath,     require('../routes/condominio'));
        this.app.use(this.edificioPath,       require('../routes/edificio'));
        this.app.use(this.domicilioPath,      require('../routes/domicilio'));
        this.app.use(this.areasComunesPath,   require('../routes/areasComunes'));
        this.app.use(this.reservaAreasComunes,require('../routes/reservaAreasComunes'));
        this.app.use(this.uploads,            require('../routes/uploads'));
        this.app.use(this.adminDeudas,        require('../routes/AdministracionDeudas'));
        this.app.use(this.adminExpensas,      require('../routes/AdministracionExpensas'));
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log(`Listening at httpL://localhost:${this.port}`)
        })
    }
}

module.exports = Server;