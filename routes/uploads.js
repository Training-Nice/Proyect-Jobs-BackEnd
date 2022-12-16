// Rutas de Auth:      Host + /api/user
const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos, validarArchivo} = require('../middlewares');
const {cargarArchivo} = require('../controllers/uploads');


const router = Router();

router.post('/',cargarArchivo)

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id', 'El id debe ser de la base de datos')
],);
module.exports = router;