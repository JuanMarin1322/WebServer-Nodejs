const { Router } = require('express');
const { check }= require('express-validator');

const { esRolValido, emailExiste, idExiste } = require('../helpers/db-validator');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete} = require('../controllers/usuarios');

const { validarCampos} = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet ); 
  
router.put('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( idExiste),
        check('rol').custom( esRolValido),

        validarCampos

],usuariosPut); 

router.post('/',[

        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','La contraseña debe de ser más de 6 letras').isLength({ min:6}),
        check('correo').custom( emailExiste),
        check('correo','El correo no es válido').isEmail(),
        // check('rol','No es un rol válido').isIn([ 'ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( esRolValido),
        
        validarCampos
        

], usuariosPost); 

router.delete('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( idExiste),

        validarCampos
        
], usuariosDelete); 





module.exports = router;