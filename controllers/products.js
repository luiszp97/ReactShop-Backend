const { response } = require('express');
const Product = require('../models/Product')

//? GET METHODS

const getAllProducts = async ( req, res = response )=> {

    try {
        
        let products = await Product.find();

        if( products.length !== 0 ) {

            return res.status(201).json({
                ok:true,
                product: products
            })
        } else {

            return res.status(404).json({
                ok: false,
                msg: 'No hay productos en la base de datos'
            })

        }

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el adminstrador'
        })

    }

};

const getProdutByCategory= async ( req, res = response ) => {

    const query = req.params.query

    try {
        
        const products = await Product.find({category : query})

        if( products.length !== 0  ){
            return res.status(201).json({
                ok:true,
                products
            })
        } else {
            res.status(501).json({
                ok: false,
                msg: 'No se encontraron productos en esta categoria'
            })
        }

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg:'Comunicate con el administrador'
        })

    }
    
}

const getProdutByPrice= async ( req, res = response ) => {

    const query = req.params.query

    try {
        
        const allProducts = await Product.find();

        const filterProducts = allProducts.filter( product => product.price <= query );

        if( filterProducts.length !== 0  ){

            return res.status(201).json({
                ok:true,
                products: filterProducts
            })

        } else {

            res.status(404).json({
                ok: false,
                msg: 'No se encontraron productos en esta categoria'
            })

        }

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el administrador'
        })
        
    }
    
};

const getProductsByName = async ( req , res = response ) => {

    const query = req.params.query;

    try {
        
        const allProducts = await Product.find();

        const filterProducts = allProducts.filter( product => product.title.includes(query) )

        if( filterProducts.length !== 0  ){
            return res.status(201).json({
                ok:true,
                products: filterProducts
            })
        } else {
            res.status(404).json({
                ok: false,
                msg: 'No se encontraron productos en esta categoria'
            })
        }

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Cominicate con el administrador'
        })

    }
   
};

const getById = async ( req, res = response ) => {

    try {
        const product = await Product.findById( req.params.id );

        if( product.length !== 0 ) {

            return res.status(201).json({
                ok:true,
                product
            })
        } else {

            return res.status(404).json({
                ok: false,
                msg: 'No hay productos en la base de datos'
            })

        }

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el adminstrador'
        })

    }
        
    
}


//? CRUD METHODS

const createNewProduct = async ( req, res = response ) => {

    const product = new Product ( req.body );


    try {

        product.user = req.uid;
        product.title = req.body.title.toLowerCase()

        const savedProduct = await product.save();
        
        return res.status(201).json({

            ok:true,
            product : savedProduct

        });
    

    } catch (error) {
       
        console.log( error )

        return res.status(500).json({

            ok: false,
            msg: 'Comunicate con el administrador'

        });

    }


};

const updateProduct = async ( req, res = response ) => {

    const productId = req.params.id;
    const uid = req.uid;

    try {

        const product = await Product.findById( productId );

        if( !product ){

            res.status(400).json({
               ok: false,
               msg: 'No existe un evento con ese id' 
            })
        };

        if( product.user.toString() !== uid ){

            return  res.status(401).json({
                ok: false,
                msg: 'No privilegios para editar este evento' 
             })

        };

        const newProduct = {

            ...req.body,
            user: uid

        }

        const updatedProduct = await Product.findByIdAndUpdate( productId, newProduct, { new: true } )
        
        res.status(200).json({
            ok:true,
            event: updatedProduct
        })
    

    } catch (error) {
       
        console.log( error );

        return res.status(500).json({

            ok: false,
            msg: 'Comunicate con el administrador'

        });

    }
}

const deleteProduct = async ( req, res = response ) => {

    const productId = req.params.id;
    const uid = req.uid;

    try {

        const product = await Product.findById( productId );

        if( !product ){

            res.status(400).json({
               ok: false,
               msg: 'No existe un evento con ese id' 
            })
        };

        if( product.user.toString() !== uid ){

            return  res.status(401).json({
                ok: false,
                msg: 'No privilegios para eliminar este producto' 
             })

        };


        const deletedProduct = await Product.findByIdAndDelete( productId )
        
        res.status(200).json({
            ok:true,
            product: deletedProduct
        })
    

    } catch (error) {
       
        console.log( error );

        return res.status(500).json({

            ok: false,
            msg: 'Comunicate con el administrador'

        });

    }
}


module.exports = {

    //? GET METHODS
    getAllProducts,
    getProdutByCategory,
    getProdutByPrice,
    getProductsByName,
    getById,

    //? CRUD METHODS
    createNewProduct,
    updateProduct,
    deleteProduct
}