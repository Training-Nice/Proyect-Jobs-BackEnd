// Rutas de Auth:      Host + /api/user
const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const {     getReservaAreaComun,
            getReservasAreasComunes,
            postReservaAreaComun,
            putReservaAreasComun,
            deleteReservasAreasComunes} = require('../controllers/reservaAreasComunes');

const router = Router();



router.get('/:id', getReservaAreaComun);

router.delete('/:id', deleteReservasAreasComunes);


router.put('/:id',  [
                        check('idCondominio', 'El idCondominio es obligatorio').not().isEmpty(),
                        check('nombre',       'La nombre es obligatorio').not().isEmpty(),
                        check('descripcion',  'La descripcion es obligatorio').not().isEmpty(),
                        check('fechaIni',     'La fecha de inicio es obligatorio').not().isEmpty(),
                        check('fechaFin',     'La fecha de fin es obligatorio').not().isEmpty(),
                        check('horaIni',      'La hora de inicio es obligatorio').not().isEmpty(),
                        check('horaFin',      'La hora de fin es obligatorio').not().isEmpty(),
                        validarCampos
                    ], putReservaAreasComun);

router.get('/', getReservasAreasComunes);

router.post('/',
                [
                    check('idCondominio', 'El idCondominio es obligatorio').not().isEmpty(),
                    check('nombre',       'La nombre es obligatorio').not().isEmpty(),
                    check('descripcion',  'La descripcion es obligatorio').not().isEmpty(),
                    check('fechaIni',     'La fecha de inicio es obligatorio').not().isEmpty(),
                    check('fechaFin',     'La fecha de fin es obligatorio').not().isEmpty(),
                    check('horaIni',      'La hora de inicio es obligatorio').not().isEmpty(),
                    check('horaFin',      'La hora de fin es obligatorio').not().isEmpty(),
                    validarCampos
                ], postReservaAreaComun);


module.exports = router;