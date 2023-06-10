/*
?  Rutas de Usuarios / Auth
?  host + /api/auth 
*/

const { Router } = require('express');
const { check } = require('express-validator')

const { fieldValidate } = require('../middlewares/fields-validate');
const { createUser, userLogin, tokenRenew } = require('../controllers/auth');
const { validateJwt } = require('../middlewares/validateJwt');

const router = Router();

//! Rutas

router.post('/register',
            [
                check('name', 'El nombre no es valido').isLength({min: 2}).isString().matches( /^[a-zA-Z\s]+$/i ).not().isEmpty(),
                check('email', 'El email no es valido').isEmail(),
                check('password', 'El password debe tener mas de 5 caracteres').isLength({ min:6 }),
                fieldValidate
                
            ],
            createUser );

router.post('/login',
            [
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password debe contener mas de 6 caracteres').isLength({min:6}),
                fieldValidate
            ], 
            userLogin);

router.get('/renew', 
            [ 
                validateJwt 
            ],
            tokenRenew)


module.exports = router;