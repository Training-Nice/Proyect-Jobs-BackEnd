const {response} = require('express');
const {pool} = require('../database/config');
const bcrypt = require('bcryptjs');
const usuarioGet = async (req , res = response) => {
    const id = req.params.id;
    try {
        const getUser = await pool.query(`SELECT * FROM users WHERE idUser=${id}`);
        if(getUser.length === 0){
            return res.json({
                ok:false,
                msg: 'No existe usuario'
            })
        }

        return res.json({
            ok:true,
            msg: getUser
        })
        
        
    } catch (error) {
        //console.log(error);
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }
}


const getUsers = async (req, res) => {
    try {
        const getUsers = await pool.query('SELECT * FROM users');
        //console.log(getUsers);

        res.json({
            ok:true,
            msg: getUsers
        })

        
    } catch (error) {
        //console.log(error);
        res.status(404).json({
            ok:false,
            msg:error 
        })
    }
}

const usuariosPost = async(req , res = response) => {   
    //desestructurando
    const {username,password,rol,nombre,apellido_paterno,apellido_materno} = req.body;

    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password,salt);
    try {
        const getUser = await pool.query(`SELECT * FROM users WHERE username='${username}'`);
        if(getUser.length != 0){
            return res.status(404).json({
                ok:false,
                msg:'El usuario ya existe intente con otro' 
            })
        }


        const query = await pool.query(`INSERT INTO users (username,password,rol,nombre,apellido_paterno,apellido_materno) 
                                            VALUES ('${username}','${newPassword}','${rol}','${nombre}','${apellido_paterno}','${apellido_materno}')`);
        
        return res.json({
            ok:true,
            msg: query
        })

        
    } catch (error) {
        //console.log(error);
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }

}

const usuarioPut = async(req , res = response) => {
    const id = req.params.id;
    //desestructurando
    const {username,password,rol,nombre,apellido_paterno,apellido_materno} = req.body;
    try {
        const updateUser = await pool.query(` UPDATE users
                                            SET username='${username}',password='${password}',rol='${rol}',nombre='${nombre}',apellido_paterno='${apellido_paterno}',apellido_materno='${apellido_materno}'
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

const usuarioDelete = async (req , res = response) => {
    const id = req.params.id;
    try {
        const deleteUser = await pool.query(`DELETE FROM users WHERE idUser=${id}`);
        if(deleteUser.affectedRows == 0){
            return res.json({
                ok:false,
                msg: 'No existe usuario'
            })
        }

        return res.json({
            ok:true,
            msg: deleteUser
        })
        
        
    } catch (error) {
        //console.log(error);
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }
}

module.exports = {
    getUsers,
    usuariosPost,
    usuarioPut,
    usuarioGet,
    usuarioDelete
}