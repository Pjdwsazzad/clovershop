const session = require("express-session")
const Product = require("../models/product.model")

async function addProductToCart(req, res) {

    console.log(req.body)

    const { productId, quantity } = req.body

    console.log(productId)

    const product = await Product.findOne({_id: productId})

    if(product) {
        const cartItem = {
            productId: productId,
            quantity: quantity
        }

        if(!req.session.cart) {
            req.session.cart = []
            let updatedCart = []

            updatedCart = req.session.cart
            updatedCart.push(cartItem)
            req.session.cart = updatedCart

            return res.json({status: 200})
        }

        else {
            let updatedCart = []

            updatedCart = req.session.cart
            updatedCart.push(cartItem)
            res.session.cart = updatedCart

            return res.json({status: 200})
        }
    }

    else {
        return res.json({status: 404})
    }
}

async function displayCart(req, res) {
    if(req.session.cart) {
        return res.json(req.session.cart)
    }

    else {
        return res.json({status: 404})
    }
}

function resetCart(req, res) {
    req.session.cart = []
    return res.json({stauts: 200})
}

module.exports = {
    addProductToCart,
    displayCart,
    resetCart
}