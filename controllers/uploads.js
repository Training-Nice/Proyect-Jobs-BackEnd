const path = require('path');
const {response} = require('express');
const {subirArchivo} = require('../helpers');

const cargarArchivo = async (req , res = response) => {   


    try {
         //Imagenes
        const pathCompleto = await subirArchivo(req.files,undefined,'imgs');

        res.json({
            nombre: pathCompleto
        });
    } catch (msg) {
        res.status(400).json({msg});
    }
    
}

const actualizarImagen = async (req, res= response) => {
    const {id, coleccion} = req.params;
}





module.exports = {
    cargarArchivo
}