import { Router } from 'express';
import { cartManager } from '../dao/fileSystem/CartManager.js';
import { cartManagerDB } from '../dao/mongoDB/cartManagerDB.js';

const router = Router();

// rutas para fs

router.post('/fs', async (req, res) => {
	try {
		const response = await cartManager.createCart();
		res.status(200).json({ message: 'Cart created', carts: response });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.get('/fs/:cid', async (req, res) => {
	const { cid } = req.params;
	try {
		const cart = await cartManager.getCartById(+cid);
		if (!cart) {
			return res.status(404).json({ message: 'Cart not found' });
		}
		res.status(200).json({ message: 'Cart found', cart });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.post('/fs/:cid/product/:pid', async (req, res) => {
	const { cid, pid } = req.params;
	try {
		const response = await cartManager.addProductToCart(+cid, +pid);
		res.status(200).json({ message: 'Product add', cart: response });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
})

// rutas para db

router.get('/db', async (req, res) => {
	try {
		const carts = await cartManagerDB.mostrarCart();
		res.status(200).json({ message: 'Carts found', carts });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.get('/db/:idC', async (req, res) => {
	const { idC } = req.params;
	try {
		const idCart = await cartManagerDB.mostrarCartById(idC);
		res.status(200).json({ message: 'Cart', idCart });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.post('/db', async (req, res) => {
	try {
		const newCart = await cartManagerDB.crearCart(req.body);
		res.status(200).json({ message: 'Cart created', newCart: newCart });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.post('/db/:idCart/products/:idProduct', async (req, res) => {
	const { idCart, idProduct } = req.params;
	try {
		const productAdd = await cartManagerDB.agregarProductToCart(idCart, idProduct);
		res.status(200).json({ message: 'Product add to cart', productAdd: productAdd });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

// ----------------------------------------------------------------

router.put('/db/:idC', async (req, res) => {
	const { idC } = req.params;
	try {
		const cartUpdate = await cartManagerDB.actualizarCart(idC);
		res.status(200).json({ message: 'Cart update', cartUpdate: cartUpdate });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.put('/db/:idC/products/:idP', async (req, res) => {
	const { idC, idP } = req.params;
	try {
		const quantityUpdated = await cartManagerDB.actualizarQuantify(idC, idP);
		res.status(200).json({ message: 'Quantity updated', quantityUpdated: quantityUpdated });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.delete('/db/:idC/products/:idP', async (req, res) => {
	const { idC, idP } = req.params;
	try {
		const productDelete = await cartManagerDB.eliminarProductFromCart(idC, idP);
		res.status(200).json({ message: 'Product deleted', productDelete: productDelete });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

router.delete('/db/:idC', async (req, res) => {
	const { idC } = req.params;
	try {
		const productFullDelete = await cartManagerDB.eliminarFullProductsFromCart(idC);
		res.status(200).json({ message: 'Products deleted', productFullDelete: productFullDelete });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})


export default router;