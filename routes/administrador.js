// Rutas de Auth:      Host + /api/admin
const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { getAdministrador,
        getAdministradores,
        postAdmin,
        putAdmin,
        deleteAdmin} = require('../controllers/administrador');

const router = Router();



router.get('/:id', getAdministrador);

router.get('/', getAdministradores);

router.delete('/:id', deleteAdmin);


router.put('/:id',  [
                        check('idUser', 'El idUser es obligatorio').not().isEmpty(),
                        validarCampos
                    ], putAdmin);


router.post('/',
                [
                    check('idUser', 'El idUser es obligatorio').not().isEmpty(),
                    validarCampos
                ], postAdmin);


module.exports = router;