const {response} = require('express');
const {pool} = require('../database/config');

const getDomicilio = async (req , res = response) => {
    const id = req.params.id;
    try {
        const domicilio = await pool.query(`SELECT * FROM domicilio WHERE idDomicilio=${id}`);
        if(domicilio.length === 0){
            return res.json({
                ok:false,
                msg: 'No existe usuario'
            })
        }

        return res.json({
            ok:true,
            msg: domicilio
        })
        
        
    } catch (error) {
        //console.log(error);
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }
}


const getDomicilios = async (req, res) => {
    try {
        const domicilios = await pool.query('SELECT * FROM domicilio');
        

        res.json({
            ok:true,
            msg: domicilios
        })

        
    } catch (error) {
        
        res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}

const postDomicilio = async(req , res = response) => {   
    //desestructurando
    const {idEdificio,nombre,descripcion,expensa} = req.body;
    try {
        const query = await pool.query(`INSERT INTO domicilio (idEdificio,nombre,descripcion,expensa) 
                                        VALUES ('${idEdificio}','${nombre}','${descripcion}','${expensa}')`);
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

const putDomicilio = async(req , res = response) => {
    const id = req.params.id;
    //desestructurando
    const {idEdificio,nombre,descripcion,expensa} = req.body;
    try {
        const updateDomicilio = await pool.query(`  UPDATE domicilio
                                                    SET idEdificio='${idEdificio}', nombre='${nombre}',descripcion='${descripcion}',expensa='${expensa}'
                                                    WHERE idDomicilio=${id}`);
        if(updateDomicilio.affectedRows === 0){
            return res.json({
                ok:false,
                msg: 'No se actualizo el Domicilio correctamente'
            })
        }
        return res.json({
            ok:true,
            msg: updateDomicilio
        })

        
    } catch (error) {
        //console.log(error);
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }

}

const deleteDomicilio = async (req , res = response) => {
    const id = req.params.id;
    try {
        const deleteDomicilio = await pool.query(`DELETE FROM domicilio WHERE idDomicilio=${id}`);
        if(deleteDomicilio.affectedRows == 0){
            return res.json({
                ok:false,
                msg: 'No existe el Domicilio'
            })
        }

        return res.json({
            ok:true,
            msg: deleteDomicilio
        })
        
        
    } catch (error) {
        
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }
}

module.exports = {
    getDomicilio,
    getDomicilios,
    postDomicilio,
    putDomicilio,
    deleteDomicilio
}