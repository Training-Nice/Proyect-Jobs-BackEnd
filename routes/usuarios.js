// Rutas de Auth:      Host + /api/user
const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { getUsers,
        usuariosPost,
        usuarioGet,
        usuarioDelete,
        usuarioPut} = require('../controllers/usuarios');
const router = Router();



router.get('/:id', usuarioGet);

router.delete('/:id', usuarioDelete);


router.put('/:id',  [
                        check('username', 'El username es obligatorio').not().isEmpty(),
                        check('password', 'El password es obligatorio').not().isEmpty(),
                        check('rol', 'El rol es obligatorio').not().isEmpty(),
                        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                        check('apellido_paterno', 'El Apellido paterno es obligatorio').not().isEmpty(),
                        validarCampos
                    ], usuarioPut);

router.get('/', getUsers);

router.post('/',
                [
                    check('username', 'El username es obligatorio').not().isEmpty(),
                    check('password', 'El password es obligatorio').not().isEmpty(),
                    check('rol', 'El rol es obligatorio').not().isEmpty(),
                    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                    check('apellido_paterno', 'El Apellido paterno es obligatorio').not().isEmpty(),
                    validarCampos
                ], usuariosPost);


module.exports = router;