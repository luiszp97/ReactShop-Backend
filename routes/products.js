/*
?  Rutas de Productos / Products
?  host + /api/products 
*/

const { Router } = require('express');
const { check } = require('express-validator')

const { getAllProducts, createNewProduct, getProdutByCategory, getProdutByPrice, getProductsByName, updateProduct, deleteProduct, getById } = require('../controllers/products');

const { validateJwt } = require('../middlewares/validateJwt');
const { fieldValidate } =  require('../middlewares/fields-validate');


const router = Router();

router.use( validateJwt );

//! Rutas

//?GET

router.get('/', getAllProducts );

router.get('/by-category&:query', getProdutByCategory );
router.get('/by-price&:query', getProdutByPrice );
router.get('/by-title&:query', getProductsByName );
router.get('/by-id&:id', getById );

//? CRUD

router.post('/new', 
            [
                check( "title", "El titulo es obligatorio" ).not().isEmpty().isLength({min: 2}),
                check( "image", "Establece una imagen al producto valida" ).isString().not().isEmpty().isLength({min: 2}).isURL(),
                check( "description", "La descripcion es obligatoria" ).isString().not().isEmpty().isLength({min: 10}),
                check( "price", "El precio es obligatorio" ).isNumeric().not().isEmpty(),
                check( "category", "Incluyeuna categoria" ).isString().not().isEmpty(),
                fieldValidate
            ],
            createNewProduct );

router.put('/update/:id', 
            [
                check( "title", "El titulo es obligatorio" ).not().isEmpty().isLength({min: 2}),
                check( "image", "Establece una imagen al producto valida" ).isString().not().isEmpty().isLength({min: 2}).isURL(),
                check( "description", "La descripcion es obligatoria" ).isString().not().isEmpty().isLength({min: 10}),
                check( "price", "El precio es obligatorio" ).isNumeric().not().isEmpty(),
                check( "category", "Incluyeuna categoria" ).isString().not().isEmpty(),
                fieldValidate
            ],
            updateProduct );

router.delete('/update/:id', deleteProduct );




module.exports = router;