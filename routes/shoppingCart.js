/*
?  Rutas de ShoppingCard / cart
?  host + /api/cart 
*/

const { Router } = require('express');
const { check } = require('express-validator')

const { getUserCart, addProductInCart } = require('../controllers/shoppingCart');


const { validateJwt } = require('../middlewares/validateJwt');
const { fieldValidate } =  require('../middlewares/fields-validate');
const { deleteProduct } = require('../controllers/shoppingCart');


const router = Router();

router.use( validateJwt );

router.get('/', getUserCart);

router.post('/add', 
            [
                check( "title", "El titulo es obligatorio" ).not().isEmpty().isLength({min: 2}),
                check( "image", "Establece una imagen al producto valida" ).isString().not().isEmpty().isLength({min: 2}).isURL(),
                check( "description", "La descripcion es obligatoria" ).isString().not().isEmpty().isLength({min: 10}),
                check( "price", "El precio es obligatorio" ).isNumeric().not().isEmpty(),
                check( "category", "Incluyeuna categoria" ).isString().not().isEmpty(),
                fieldValidate
            ],
            addProductInCart );

router.delete('/delete-product/:id', deleteProduct );

module.exports = router;