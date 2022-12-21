const mysql = require('mysql');


const dbaConnection = () => {
    try {
        const connection = mysql.createConnection({
            user: 'bdc2ce46a42d62',
            password: '44829a00',
            host: 'us-cdbr-east-06.cleardb.net',
            database: 'heroku_08ccb0c84959343'
        });

        connection.connect((err) => {
            if (err) throw err;
            console.log('Base de datos Online!');
        });

        
       // connection.end();


    } catch (error) {
        console.log(error); 
        throw new Error('Error a la hora de iniciar la base de datos');
    }
};