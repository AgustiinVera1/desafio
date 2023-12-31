import { cartModel } from "../models/cart.model.js";

class CartManagerDB {
    async mostrarCart() {
        const cart = await cartModel.find();
        return cart;
    }

    async mostrarCartById(id) {
        const cart = await cartModel.findById(id).populate('products.product'); //populate es para que muestre la info del producto y no el id
        return cart;

    }

    async crearCart(idP, quantity) {
        const newCart = await cartModel.create(idP, quantity);
        return newCart;
    }

    async agregarProductToCart(idCart, idProduct) {
        const cart = await cartModel.findById(idCart);
        const productIndex = cart.products.findIndex((p) => p.product.equals(idProduct));
        if (productIndex === -1) {
            cart.products.push({ product: idProduct, quantity: 1 });
        } else {
            cart.products[productIndex].quantity++;
        } 
        return await cart.save();
    }
// --------------------------------

    async actualizarCart(idCart){
        const cartUpdate = await cartModel.updateOne(idCart);
        return cartUpdate;
    }
    
    async actualizarQuantify(idCart,idProduct){
        const quantifyUpdate = await cartModel.updateOne(idCart,idProduct);
        return quantifyUpdate;
    }
    
    async eliminarProductFromCart(idCart, idProduct) {
        const productDelete = await cartModel.deleteOne(idCart, idProduct);
        return productDelete;
    }

    async eliminarFullProductsFromCart(idCart){
        const productFullDelete = await cartModel.deleteMany(idCart);
        return productFullDelete;
    }
}
export const cartManagerDB = new CartManagerDB();