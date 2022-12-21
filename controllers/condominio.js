const {response} = require('express');
const {pool} = require('../database/config');

const getCondominio = async (req , res = response) => {
    const id = req.params.id;
    try {
        const condominio = await pool.query(`SELECT * FROM condominio WHERE idCondominio=${id}`);
        if(condominio.length === 0){
            return res.json({
                ok:false,
                msg: 'No existe usuario'
            })
        }

        return res.json({
            ok:true,
            msg: condominio
        })
        
        
    } catch (error) {
        //console.log(error);
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }
}


const getCondominios = async (req, res) => {
    try {
        const condominios = await pool.query('SELECT * FROM condominio');
        

        res.json({
            ok:true,
            msg: condominios
        })

        
    } catch (error) {
        //console.log(error);
        res.status(404).json({
            ok:false,
            msg:error 
        })
    }
}

const postCondominio = async(req , res = response) => {   
    //desestructurando
    const {nombre,descripcion} = req.body;
    try {
        const query = await pool.query(`INSERT INTO condominio (nombre,descripcion)
                                            VALUES ('${nombre}','${descripcion}')`);
        res.json({
            ok:true,
            msg: query
        })

        
    } catch (error) {
        //console.log(error);
        res.status(400).json({
            ok:false,
            msg:error 
        })
    }

}

const putCondominio = async(req , res = response) => {
    const id = req.params.id;
    //desestructurando
    const {nombre,descripcion} = req.body;
    try {
        const updateCondominio = await pool.query(` UPDATE condominio
                                            SET nombre='${nombre}',descripcion='${descripcion}'
                                            WHERE idCondominio=${id}`);
        if(updateCondominio.affectedRows === 0){
            return res.json({
                ok:false,
                msg: 'No se actualizo el condominio correctamente'
            })
        }
        return res.json({
            ok:true,
            msg: updateCondominio
        })

        
    } catch (error) {
        //console.log(error);
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }

}

const deleteCondominio = async (req , res = response) => {
    const id = req.params.id;
    try {
        const deleteCondominio = await pool.query(`DELETE FROM condominio WHERE idCondominio=${id}`);
        if(deleteCondominio.affectedRows == 0){
            return res.json({
                ok:false,
                msg: 'No existe el condominio'
            })
        }

        return res.json({
            ok:true,
            msg: deleteCondominio
        })
        
        
    } catch (error) {
        
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }
}

module.exports = {
    getCondominio,
    getCondominios,
    postCondominio,
    putCondominio,
    deleteCondominio
}