const {response} = require('express');
const {pool} = require('../database/config');

const getReservaAreaComun = async (req , res = response) => {
    const id = req.params.id;
    try {
        const areaComun = await pool.query(`SELECT * FROM reservasareascomunes WHERE idreservaAreaComun=${id}`);
        if(areaComun.length === 0){
            return res.json({
                ok:false,
                msg: 'No existe la reserva'
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


const getReservasAreasComunes = async (req, res) => {
    try {
        const areasComunes = await pool.query('SELECT * FROM reservasareascomunes');
        
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

const postReservaAreaComun = async(req , res = response) => {   
    //desestructurando
    const {idCondominio,idAreaComun,nombre,descripcion,fechaIni,fechaFin,horaIni,horaFin,idUser} = req.body;
    try {
        const query = await pool.query(`INSERT INTO reservasareascomunes (idCondominio,idAreaComun,idUser,nombre,descripcion,fechaIni,fechaFin,horaIni,horaFin)
                                                                VALUES ('${idCondominio}','${idAreaComun}','${idUser}','${nombre}','${descripcion}','${fechaIni}','${fechaFin}','${horaIni}','${horaFin}')`);
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

const putReservaAreasComun = async(req , res = response) => {
    const id = req.params.id;
    //desestructurando
    const {idCondominio,idAreaComun,nombre,descripcion,fechaIni,fechaFin,horaIni,horaFin,idUser} = req.body;
    try {
        const updateareasComunes = await pool.query(`  UPDATE reservasareascomunes
                                                    SET idCondominio='${idCondominio}',idAreaComun='${idAreaComun}' ,idUser='${idUser}',nombre='${nombre}',descripcion='${descripcion}',fechaIni='${fechaIni}',fechaFin='${fechaFin}',horaIni='${horaIni}',horaFin='${horaFin}'
                                                    WHERE idreservaAreaComun=${id}`);
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

const deleteReservasAreasComunes = async (req , res = response) => {
    const id = req.params.id;
    try {
        const deleteareasComunes = await pool.query(`DELETE FROM reservasareascomunes WHERE idreservaAreaComun=${id}`);
        if(deleteareasComunes.affectedRows == 0){
            return res.json({
                ok:false,
                msg: 'No existe la reserva'
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
    getReservaAreaComun,
    getReservasAreasComunes,
    postReservaAreaComun,
    putReservaAreasComun,
    deleteReservasAreasComunes
}