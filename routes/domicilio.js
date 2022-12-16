// Rutas de Auth:      Host + /api/user
const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { getDomicilio,
        getDomicilios,
        postDomicilio,
        putDomicilio,
        deleteDomicilio} = require('../controllers/domicilio');

const router = Router();



router.get('/:id', getDomicilio);

router.delete('/:id', deleteDomicilio);


router.put('/:id',  [
                        check('idEdificio', 'El nombre es obligatorio').not().isEmpty(),
                        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                        validarCampos
                    ], putDomicilio);

router.get('/', getDomicilios);

router.post('/',
                [
                    check('idEdificio', 'El nombre es obligatorio').not().isEmpty(),
                    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                    validarCampos
                ], postDomicilio);


module.exports = router;