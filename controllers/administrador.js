const {response} = require('express');
const {pool} = require('../database/config');

const getAdministrador = async (req , res = response) => {
    const id = req.params.id;
    try {
        const getAdmin = await pool.query(`SELECT * FROM admin WHERE idAdmin=${id}`);
        if(getAdmin.length === 0){
            return res.json({
                ok:false,
                msg: 'No existe administrador'
            })
        }

        return res.json({
            ok:true,
            msg: getAdmin
        })
        
        
    } catch (error) {
        //console.log(error);
        return res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}


const getAdministradores = async (req, res) => {
    try {
        const getAdmins = await pool.query('SELECT * FROM admin');
        res.json({
            ok:true,
            msg: getAdmins
        })

        
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}

const postAdmin = async(req , res = response) => {   
    //desestructurando
    const {idUser} = req.body;
    try {
        const query = await pool.query(`INSERT INTO admin (idUser) 
                                            VALUES ('${idUser}')`);
        
        res.json({
            ok:true,
            msg: query
        })

        
    } catch (error) {
        //console.log(error);
        res.status(404).json({
            ok:false,
            msg:error 
        })
    }

}

const putAdmin = async(req , res = response) => {
    const id = req.params.id;
    //desestructurando
    const {idUser} = req.body;
    try {
        const updateUser = await pool.query(`UPDATE admin
                                            SET idUser='${idUser}'
                                            WHERE idAdmin=${id}`);
        
        if(updateUser.affectedRows === 0){
            return res.json({
                ok:false,
                msg: 'No se actualizo el administrador correctamente'
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

const deleteAdmin = async (req , res = response) => {
    const id = req.params.id;
    try {
        const deleteAdmin = await pool.query(`DELETE FROM admin WHERE idAdmin=${id}`);
        if(deleteAdmin.affectedRows == 0){
            return res.json({
                ok:false,
                msg: 'No existe administrador'
            })
        }

        return res.json({
            ok:true,
            msg: deleteAdmin
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
    getAdministrador,
    getAdministradores,
    postAdmin,
    putAdmin,
    deleteAdmin
}