const { response } = require('express');
const ShoppingCart = require('../models/ShoppingCart');

const getUserCart = async ( req, res = response ) => {

    const uid = req.uid
    
    try {
        
        const products = await ShoppingCart.find({ user : uid});

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
        console.log(error)
        
        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el adminstrador'
        })

    }

}

const addProductInCart = async ( req, res = response ) => {

    const product = new ShoppingCart ( req.body );

    try {

        product.user = req.uid;
        product.id = req.id

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


}


const deleteProduct = async ( req, res = response ) => {

    const productId = req.params.id;
    const uid = req.uid;
    
        try {
    
            const product = await ShoppingCart.findById( productId );
    
            if( !product ){
    
                res.status(400).json({
                   ok: false,
                   msg: 'No existe un producto con ese id' 
                })
            };
    
            if( product.user.toString() !== uid ){
    
                return  res.status(401).json({
                    ok: false,
                    msg: 'No privilegios para eliminar este producto' 
                 })
    
            };
    
    
            const deletedProduct = await ShoppingCart.findByIdAndDelete( productId )
            
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
    getUserCart,
    addProductInCart,
    deleteProduct
}