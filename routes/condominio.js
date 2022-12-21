// Rutas de Auth:      Host + /api/user
const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const {  getCondominio,
    getCondominios,
    postCondominio,
    putCondominio,
    deleteCondominio} = require('../controllers/condominio');

const router = Router();



router.get('/:id', getCondominio);

router.delete('/:id', deleteCondominio);


router.put('/:id',  [
                        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                        check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
                        validarCampos
                    ], putCondominio);

router.get('/', getCondominios);

router.post('/',
                [
                    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
                    validarCampos
                ], postCondominio);


module.exports = router;