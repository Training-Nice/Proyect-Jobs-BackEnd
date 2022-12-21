const {response} = require('express');
const bcrypt = require('bcryptjs');
const {pool} = require('../database/config');
const {generarJWT} = require('../helpers/jwt')


const crearUsuario = (req, res) => {
    const {name, email,password} = req.body;
    
    res.status(201).json({
        ok:true,
        msg: 'registro'
    })
}
const actualizarPassword = async (req, res) => {
    
    const id = req.params.id;
    //desestructurando
    const {username,password,rol,nombre,apellido_paterno,apellido_materno} = req.body;

    // hash para el password
    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password,salt);
    try {
        const updateUser = await pool.query(` UPDATE users
                                            SET password='${newPassword}'
                                            WHERE idUser=${id}`);
        //console.log(updateUser);
        if(updateUser.affectedRows === 0){
            return res.json({
                ok:false,
                msg: 'No se actualizo el usuario correctamente'
            })
        }
        return res.json({
            ok:true,
            msg: updateUser
        })

        
    } catch (error) {
        //console.log(error);
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }
}
const loginUsuario = async (req, res) => {
try {
    const {username,password} = req.body;
    
    const getUser = await pool.query(`SELECT * FROM users WHERE username='${username}'`);
    
    if(getUser.length === 0){
        return res.status(400).json({
            ok:false,
            msg: 'No existe usuario'
        })
    }
    
    const {idUser,username:user,nombre,password:passwordDb,rol} = getUser[0];



    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, passwordDb);

    if(!validPassword){
        return res.status(400).json({
            ok:false,
            msg:'Password incorrecto'
        });
    }

    //console.log(idUser, nombre);
    // Generar nuestro JWT
    const token = await generarJWT(idUser,rol);
    

    return res.status(201).json({
        ok:true,
        uid: idUser, 
        username: user,
        rol,
        nombre: nombre,
        token
    });

} catch (error) {
    return res.status(500).json({
        ok:false,
        msg: 'Por favor hable con administrador',
        error: error
    })
}
}

const reavalidarToken = async (req, res) => {

    const uid = req.uid;
    //const name = req.name;
    const rol = req.rol;

    //const token = await generarJWT(uid,name,rol);
    const token = await generarJWT(uid,rol);
    res.json({
        ok:true,
        token
    })
}



module.exports = {
    crearUsuario,
    loginUsuario,
    reavalidarToken,
    actualizarPassword
}