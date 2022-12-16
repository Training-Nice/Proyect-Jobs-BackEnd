// Rutas de Auth:      Host + /api/user
const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { 
    getAdministracionExpensa,
    getAdministracionExpensas,
    postAdministracionExpensa,
    putAdministracionExpensa,
    deleteAdministracionExpensa,
    getAdministracionExpensaUser
    } = require('../controllers/AdministracionExpensas');
const router = Router();


router.get('/userExpensas/:id', getAdministracionExpensaUser);



router.get('/:id', getAdministracionExpensa);

router.delete('/:id', deleteAdministracionExpensa);


router.put('/:id',  [
                        check('idUser', 'El id de usuario es obligatorio').not().isEmpty(),
                        validarCampos
                    ], putAdministracionExpensa);

router.get('/', getAdministracionExpensas);

router.post('/',
                [
                    check('idUser', 'El id de usuario es obligatorio').not().isEmpty(),
                    validarCampos
                ], postAdministracionExpensa);


module.exports = router;