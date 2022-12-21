const {response} = require('express');
const {pool} = require('../database/config');

const getAreaComun = async (req , res = response) => {
    const id = req.params.id;
    try {
        const areaComun = await pool.query(`SELECT * FROM areascomunes WHERE idAreaComun=${id}`);
        if(areaComun.length === 0){
            return res.json({
                ok:false,
                msg: 'No existe el area seleccionada'
            })
        }

        return res.json({
            ok:true,
            msg: areaComun
        })
        
        
    } catch (error) {
        //console.log(error);
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }
}


const getAreasComunes = async (req, res) => {
    try {
        const areasComunes = await pool.query('SELECT * FROM areascomunes');
        

        res.json({
            ok:true,
            msg: areasComunes
        })

        
    } catch (error) {
        
        res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}

const postAreasComunes = async(req , res = response) => {   
    //desestructurando
    const {idCondominio,nombre,descripcion,costoHora} = req.body;
    try {
        const query = await pool.query(`INSERT INTO areascomunes (idCondominio,nombre,descripcion,costoHora)
                                            VALUES ('${idCondominio}','${nombre}','${descripcion}','${costoHora}')`);
        res.json({
            ok:true,
            msg: query
        })
        
    } catch (error) {
        
        res.status(400).json({
            ok:false,
            msg:error 
        })
    }

}

const putAreasComunes = async(req , res = response) => {
    const id = req.params.id;
    //desestructurando
    const {idCondominio,nombre,descripcion,costoHora} = req.body;
    try {
        const updateareasComunes = await pool.query(`  UPDATE areascomunes
                                                    SET idCondominio='${idCondominio}',nombre='${nombre}',descripcion='${descripcion}',costoHora='${costoHora}'
                                                    WHERE idAreaComun=${id}`);
        if(updateareasComunes.affectedRows === 0){
            return res.json({
                ok:false,
                msg: 'No se actualizo el Area Comun correctamente'
            })
        }
        return res.json({
            ok:true,
            msg: updateareasComunes
        })

        
    } catch (error) {
        //console.log(error);
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }

}

const deleteareasComunes = async (req , res = response) => {
    const id = req.params.id;
    try {
        const deleteareasComunes = await pool.query(`DELETE FROM areascomunes WHERE idAreaComun=${id}`);
        if(deleteareasComunes.affectedRows == 0){
            return res.json({
                ok:false,
                msg: 'No existe el areasComunes'
            })
        }

        return res.json({
            ok:true,
            msg: deleteareasComunes
        })
        
        
    } catch (error) {
        
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }
}

module.exports = {
    getAreaComun,
    getAreasComunes,
    postAreasComunes,
    putAreasComunes,
    deleteareasComunes
}