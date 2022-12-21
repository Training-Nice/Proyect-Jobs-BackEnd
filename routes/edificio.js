// Rutas de Auth:      Host + /api/user
const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { getEdificios,
        postEdificio,
        putEdificio,
        getEdificio,
        deleteEdificio} = require('../controllers/edificio');
const router = Router();



router.get('/:id', getEdificio);

router.delete('/:id', deleteEdificio);


router.put('/:id',  [
                        check('idCondominio', 'El id condominio es obligatorio').not().isEmpty(),
                        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                        validarCampos
                    ], putEdificio);

router.get('/', getEdificios);

router.post('/',
                [
                    check('idCondominio', 'El id condominio es obligatorio').not().isEmpty(),
                    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                    validarCampos
                ], postEdificio);


module.exports = router;