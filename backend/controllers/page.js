const {StatusCodes} = require('http-status-codes');
const Shop = require('../models/Shop')

const findProduct = async(req, res) =>{
    const products = await Shop.find();
    res.send(products)
}


const findOneProductBySlug = async(req, res) =>{
    const product = await Shop.findOne({slug:req.params.slug});
    if(product){
        res.status(StatusCodes.OK).send(product)
    }
    else{
        res.status(404).send({message: 'Product not found'})
    }
}

const findOneProductById = async(req, res) =>{
    const product = await Shop.findById(req.params.id)
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
}

module.exports = {findProduct, findOneProductById, findOneProductBySlug};

