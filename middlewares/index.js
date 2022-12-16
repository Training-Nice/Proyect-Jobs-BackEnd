const validarArchivo = require('../middlewares/validar-archivo');
const validarCampos = require('../middlewares/validar-campos');


module.exports = {
    ...validarArchivo,
    ...validarCampos
}