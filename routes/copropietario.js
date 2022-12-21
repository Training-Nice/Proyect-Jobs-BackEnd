// Rutas de Auth:      Host + /api/user
const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { 
    getCopropietario,
    getCopropietarios,
    postCopropietario,
    putCopropietario,
    deleteCopropietario,
    getCopropietariosInfoComplete,
    getCopropietariosInfoCompleteByCondominio
    } = require('../controllers/copropietario');
const router = Router();


router.get('/infoComplete', getCopropietariosInfoComplete);
router.get('/infoComplete/condominio/:id', getCopropietariosInfoCompleteByCondominio);

router.get('/:id', getCopropietario);

router.delete('/:id', deleteCopropietario);


router.put('/:id',  [
                        check('idUser', 'El id de usuario es obligatorio').not().isEmpty(),
                        check('idDomicilio', 'El id de domicilio es obligatorio').not().isEmpty(),
                        validarCampos
                    ], putCopropietario);

router.get('/', getCopropietarios);

router.post('/',
                [
                    check('idUser', 'El id de usuario es obligatorio').not().isEmpty(),
                    check('idDomicilio', 'El id de domicilio es obligatorio').not().isEmpty(),
                    validarCampos
                ], postCopropietario);




module.exports = router;