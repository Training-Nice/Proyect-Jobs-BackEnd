// Rutas de Auth:      Host + /api/user
const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const {   getAreaComun,
        getAreasComunes,
        postAreasComunes,
        putAreasComunes,
        deleteareasComunes} = require('../controllers/areasComunes');

const router = Router();



router.get('/:id', getAreaComun);

router.delete('/:id', deleteareasComunes);


router.put('/:id',  [
                        check('idCondominio', 'El idCondominio es obligatorio').not().isEmpty(),
                        check('nombre', 'La nombre es obligatorio').not().isEmpty(),
                        check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
                        check('costoHora', 'La costoHora es obligatorio').not().isEmpty(),
                        validarCampos
                    ], putAreasComunes);

router.get('/', getAreasComunes);

router.post('/',
                [
                    check('idCondominio', 'El idCondominio es obligatorio').not().isEmpty(),
                    check('nombre', 'La nombre es obligatorio').not().isEmpty(),
                    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
                    check('costoHora', 'La costoHora es obligatorio').not().isEmpty(),
                    validarCampos
                ], postAreasComunes);


module.exports = router;