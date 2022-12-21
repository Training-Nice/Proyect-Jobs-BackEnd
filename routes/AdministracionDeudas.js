// Rutas de Auth:      Host + /api/AdministracionDeudas
const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { 
    getAdministracionDeuda,
    getAdministracionDeudas,
    postAdministracionDeuda,
    putAdministracionDeuda,
    deleteAdministracionDeuda,
    getAdministracionDeudaUser
    } = require('../controllers/AdministracionDeudas');
const router = Router();


router.get('/deudasUser/:id', getAdministracionDeudaUser);

router.get('/:id', getAdministracionDeuda);

router.delete('/:id', deleteAdministracionDeuda);


router.put('/:id',  [
                        check('idUser', 'El id de usuario es obligatorio').not().isEmpty(),
                        validarCampos
                    ], putAdministracionDeuda);

router.get('/', getAdministracionDeudas);

router.post('/',
                [
                    check('idUser', 'El id de usuario es obligatorio').not().isEmpty(),
                    validarCampos
                ], postAdministracionDeuda);


module.exports = router;