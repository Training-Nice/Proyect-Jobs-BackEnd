const {response} = require('express');
const {pool} = require('../database/config');

const getCopropietario = async (req , res = response) => {
    const id = req.params.id;
    try {
        const copropietario = await pool.query(`SELECT * FROM copropietario WHERE idCopropietario=${id}`);
        if(copropietario.length === 0){
            return res.json({
                ok:false,
                msg: 'No existe el copropietario'
            })
        }

        return res.json({
            ok:true,
            msg: copropietario
        })
        
        
    } catch (error) {
        
        return res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}


const getCopropietarios = async (req, res) => {
    try {
        const Copropietarios = await pool.query('SELECT * FROM copropietario');
        
        res.json({
            ok:true,
            msg: Copropietarios
        })

        
    } catch (error) {
        //console.log(error);
        res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}
const getCopropietariosInfoComplete = async (req, res) => {

    try {
        const Copropietarios = await pool.query(`select td.idUser,td.idCopropietario,td.username ,td.nombre ,td.apellido_paterno,e.nombre as nombreEdif, c2.nombre as nombreCondominio,td.totalDeudas ,tde.totalDeudasExpensa
                                                from totaldeudasexpensasbyuser tde
                                                inner join totaldeudasbyuser td on (td.idUser = tde.idUser)
                                                inner join copropietario c on (c.idUser  = tde.idUser)
                                                inner join domicilio d on (d.idDomicilio = c.idDomicilio)
                                                inner join edificio e on (e.idEdificio = d.idEdificio)
                                                inner join condominio c2 on (c2.idCondominio = e.idCondominio)`);
        res.json({
            ok:true,
            msg: Copropietarios
        })

        
    } catch (error) {
        //console.log(error);
        res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}
const getCopropietariosInfoCompleteByCondominio = async (req, res) => {
    const id = req.params.id;
    try {
        const Copropietarios = await pool.query(`   select td.idUser,td.idCopropietario,td.username ,td.nombre ,td.apellido_paterno ,e.nombre as nombreEdif, c2.nombre as nombreCondominio,td.totalDeudas ,tde.totalDeudasExpensa,c2.nombre
                                                    from totaldeudasexpensasbyuser tde
                                                    inner join totaldeudasbyuser td on (td.idUser = tde.idUser)
                                                    inner join copropietario c on (c.idCopropietario = td.idCopropietario)
                                                    inner join domicilio d  on (d.idDomicilio  = c.idDomicilio)
                                                    inner join edificio e on (e.idEdificio = d.idEdificio)
                                                    inner join condominio c2 on (c2.idCondominio = e.idCondominio)
                                                    where c2.idCondominio = ${id};`);
        res.json({
            ok:true,
            msg: Copropietarios
        })

        
    } catch (error) {
        //console.log(error);
        res.status(400).json({
            ok:false,
            msg:error 
        })
    }
}

const postCopropietario = async(req , res = response) => {   
    //desestructurando
    const {idUser,idDomicilio} = req.body;
    try {
        const query = await pool.query(`INSERT INTO copropietario (idUser,idDomicilio) 
                                            VALUES ('${idUser}','${idDomicilio}')`);
        
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

const putCopropietario = async(req , res = response) => {
    const id = req.params.id;
    //desestructurando
    const {idUser,idDomicilio} = req.body;
    try {
        const updateCopropietario = await pool.query(`UPDATE copropietario
                                            SET idUser='${idUser}',idDomicilio='${idDomicilio}'
                                            WHERE idCopropietario=${id}`);
        
        if(updateCopropietario.affectedRows === 0){
            return res.json({
                ok:false,
                msg: 'No se actualizo el copropietario correctamente'
            })
        }
        return res.json({
            ok:true,
            msg: updateCopropietario
        })

        
    } catch (error) {
        //console.log(error);
        return res.status(404).json({
            ok:false,
            msg:error 
        })
    }

}

const deleteCopropietario = async (req , res = response) => {
    const id = req.params.id;
    try {
        const copropietarioDelete = await pool.query(`DELETE FROM copropietario WHERE idCopropietario=${id}`);
        if(copropietarioDelete.affectedRows == 0){
            return res.json({
                ok:false,
                msg: 'No existe usuario'
            })
        }

        return res.json({
            ok:true,
            msg: copropietarioDelete
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
    getCopropietario,
    getCopropietarios,
    postCopropietario,
    putCopropietario,
    deleteCopropietario,
    getCopropietariosInfoComplete,
    getCopropietariosInfoCompleteByCondominio
}