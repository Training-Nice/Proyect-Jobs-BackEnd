const {response} = require('express');
const {pool} = require('../database/config');

const getEdificio = async (req , res = response) => {
    const id = req.params.id;
    try {
        const edificio = await pool.query(`SELECT * FROM edificio WHERE idEdificio=${id}`);
        if(edificio.length === 0){
            return res.json({
                ok:false,
                msg: 'No existe edificio'
            })
        }
        return res.json({
            ok:true,
            msg: edificio
        })
        
        
    } catch (error) {
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }
}


const getEdificios = async (req, res) => {
    try {
        const edificios = await pool.query('SELECT * FROM edificio');
        
        res.json({
            ok:true,
            msg: edificios
        })

        
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}

const postEdificio = async(req , res = response) => {   
    //desestructurando
    const {idCondominio,nombre,descripcion} = req.body;
    try {
        const query = await pool.query(`INSERT INTO edificio (idCondominio,nombre,descripcion) 
                                            VALUES ('${idCondominio}','${nombre}','${descripcion}')`);
        
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

const putEdificio = async(req , res = response) => {
    const id = req.params.id;
    //desestructurando
    const {idCondominio,nombre,descripcion} = req.body;
    try {
        const updateEdificio = await pool.query(` UPDATE edificio
                                            SET idCondominio='${idCondominio}',nombre='${nombre}',descripcion='${descripcion}'
                                            WHERE idEdificio=${id}`);
        
        if(updateEdificio.affectedRows === 0){
            return res.json({
                ok:false,
                msg: 'No se actualizo el usuario correctamente'
            })
        }
        return res.json({
            ok:true,
            msg: updateEdificio
        })

        
    } catch (error) {
        //console.log(error);
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }

}

const deleteEdificio = async (req , res = response) => {
    const id = req.params.id;
    try {
        const deleteEdificio = await pool.query(`DELETE FROM edificio WHERE idEdificio=${id}`);
        if(deleteEdificio.affectedRows == 0){
            return res.json({
                ok:false,
                msg: 'No existe usuario'
            })
        }

        return res.json({
            ok:true,
            msg: deleteEdificio
        })
        
        
    } catch (error) {
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }
}

module.exports = {
    getEdificios,
    postEdificio,
    putEdificio,
    getEdificio,
    deleteEdificio
}