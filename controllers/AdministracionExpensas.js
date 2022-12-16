const {response} = require('express');
const {pool} = require('../database/config');

const getAdministracionExpensa = async (req , res = response) => {
    const id = req.params.id;
    try {
        const Expensa = await pool.query(`SELECT * FROM administracionexpensas WHERE idexpensa=${id}`);
        if(Expensa.length === 0){
            return res.json({
                ok:false,
                msg: 'No existe la Expensa'
            })
        }

        return res.json({
            ok:true,
            msg: Expensa
        })
        
        
    } catch (error) {
        
        return res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}
const getAdministracionExpensaUser = async (req , res = response) => {
    const id = req.params.id;
    try {
        const Expensa = await pool.query(`  SELECT * 
                                            FROM administracionexpensas a
                                            where a.idUser = '${id}'`);


        return res.json({
            ok:true,
            msg: Expensa
        })
        
        
    } catch (error) {
        
        return res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}

const getAdministracionExpensas = async (req, res) => {
    try {
        const AdministracionExpensas = await pool.query('SELECT * FROM administracionexpensas');
        
        res.json({
            ok:true,
            msg: AdministracionExpensas
        })

        
    } catch (error) {
        //console.log(error);
        res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}

const postAdministracionExpensa = async(req , res = response) => {   
    //desestructurando
    const {idUser,descripcion,fecha,estado,monton} = req.body;
    try {
        const query = await pool.query(`INSERT INTO administracionexpensas (idUser,descripcion,fecha,estado,monton) 
                                            VALUES ('${idUser}','${descripcion}','${fecha}','${estado}','${monton}')`);
        
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

const putAdministracionExpensa = async(req , res = response) => {
    const id = req.params.id;
    //desestructurando
    const {idUser,descripcion,fecha,estado,monton} = req.body;
    try {
        const updateAdministracionExpensa = await pool.query(`UPDATE administracionexpensas
                                            SET idUser='${idUser}',descripcion='${descripcion}',fecha='${fecha}',estado='${estado}',monton='${monton}'
                                            WHERE idexpensa=${id}`);

        if(updateAdministracionExpensa.affectedRows === 0){
            return res.json({
                ok:false,
                msg: 'No se actualizo la Expensa correctamente'
            })
        }
        return res.json({
            ok:true,
            msg: updateAdministracionExpensa
        })

        
    } catch (error) {
        //console.log(error);
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }

}

const deleteAdministracionExpensa = async (req , res = response) => {
    const id = req.params.id;
    try {
        const AdministracionExpensa = await pool.query(`DELETE FROM administracionexpensas WHERE idexpensa=${id}`);
        if(AdministracionExpensa.affectedRows == 0){
            return res.json({
                ok:false,
                msg: 'No existe usuario'
            })
        }

        return res.json({
            ok:true,
            msg: AdministracionExpensa
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
    getAdministracionExpensa,
    getAdministracionExpensas,
    postAdministracionExpensa,
    putAdministracionExpensa,
    deleteAdministracionExpensa,
    getAdministracionExpensaUser
}