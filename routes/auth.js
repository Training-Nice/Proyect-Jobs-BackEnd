// Rutas de Auth:      Host + /api/auth
const {Router} = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {crearUsuario,loginUsuario,reavalidarToken,actualizarPassword} = require('../controllers/auth');
const {validarJWT} = require('../middlewares/validar-jwt');
const router = Router();



router.post('/new',
            [
                check('name', 'El nombre es obligatorio').not().isEmpty(),                
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password es obligatorio').isLength({min:6}),
                validarCampos
            ],
            crearUsuario);


router.post('/',
            [
                check('username', 'El username es obligatorio').not().isEmpty(),   
                check('password', 'El password es obligatorio con 6 caracteres de minimo').not().isEmpty(),   
                validarCampos
            ],
            loginUsuario
);

router.put('/upPass/:id',actualizarPassword);


router.get('/renew',validarJWT,reavalidarToken);





module.exports = router;