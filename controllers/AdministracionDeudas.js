const {response} = require('express');
const {pool} = require('../database/config');

const getAdministracionDeuda = async (req , res = response) => {
    const id = req.params.id;
    try {
        const deuda = await pool.query(`SELECT * FROM administraciondeudas WHERE idDeudaCondominio=${id}`);
        if(deuda.length === 0){
            return res.json({
                ok:false,
                msg: 'No existe la deuda'
            })
        }

        return res.json({
            ok:true,
            msg: deuda
        })
        
        
    } catch (error) {
        
        return res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}

// OJO wait moment
const getAdministracionDeudaUser = async (req , res = response) => {
    const id = req.params.id;
    console.log('.');
    try {
        const deuda = await pool.query(`SELECT * 
                                        FROM administraciondeudas a
                                        where a.idUser = '${id}'`);
        return res.json({
            ok:true,
            msg: deuda
        })
        
        
    } catch (error) {
        
        return res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}

const getAdministracionDeudas = async (req, res) => {
    try {
        const AdministracionDeudas = await pool.query('SELECT * FROM administraciondeudas');
        
        res.json({
            ok:true,
            msg: AdministracionDeudas
        })

        
    } catch (error) {
        //console.log(error);
        res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}

const postAdministracionDeuda = async(req , res = response) => {   
    //desestructurando
    const {idUser,descripcion,monton,fecha,estado} = req.body;
    try {
        const query = await pool.query(`INSERT INTO administraciondeudas (idUser,descripcion,monton,fecha,estado) 
                                            VALUES ('${idUser}','${descripcion}','${monton}','${fecha}','${estado}')`);
        
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

const putAdministracionDeuda = async(req , res = response) => {
    const id = req.params.id;
    //desestructurando
    const {idUser,descripcion,monton,fecha,estado} = req.body;
    try {
        const updateAdministracionDeuda = await pool.query(`UPDATE administraciondeudas
                                            SET idUser='${idUser}',descripcion='${descripcion}',monton='${monton}',fecha='${fecha}',estado='${estado}'
                                            WHERE idDeudaCondominio=${id}`);

        if(updateAdministracionDeuda.affectedRows === 0){
            return res.json({
                ok:false,
                msg: 'No se actualizo la deuda correctamente'
            })
        }
        return res.json({
            ok:true,
            msg: updateAdministracionDeuda
        })

        
    } catch (error) {
        //console.log(error);
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }

}

const deleteAdministracionDeuda = async (req , res = response) => {
    const id = req.params.id;
    try {
        const AdministracionDeuda = await pool.query(`DELETE FROM administraciondeudas WHERE idDeudaCondominio=${id}`);
        if(AdministracionDeuda.affectedRows == 0){
            return res.json({
                ok:false,
                msg: 'No existe usuario'
            })
        }

        return res.json({
            ok:true,
            msg: AdministracionDeuda
        })
        
        
    } catch (error) {
        //console.log(error);
        return res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}

module.exports = {
    getAdministracionDeuda,
    getAdministracionDeudas,
    postAdministracionDeuda,
    putAdministracionDeuda,
    deleteAdministracionDeuda,
    getAdministracionDeudaUser
}