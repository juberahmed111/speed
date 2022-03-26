import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import Cart from '../comonents/Header/Cart/Cart';
import './Shop.css'
import { addToDb, getStoreCart } from '../utilities/fakedb';

const Shop = () => {
    const [products, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
    console.log(cart);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProduct(data))
    }, []);

    useEffect(() => {
        const storedCart = getStoreCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === storedCart.id);
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct)
            }
        }
        setCart(savedCart)
    }, [products])


    const handleAddToCart = (selectedProduct) => {

        // im change this product 
        let newCart = [];

        const exist = cart.find(product => product.id === selectedProduct.id);
        if (!exist) {
            selectedProduct.quantity = 1;

            newCart = [...cart, selectedProduct];
        }

        else {
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exist.quantity = exist.quantity + 1;
            newCart = [...rest, exist]
        }

        setCart(newCart);
        addToDb(selectedProduct.id)
        // console.log(newCart);


    }
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product =>
                        <Product
                            product={product}
                            key={product.id}
                            handleAddToCart={handleAddToCart}
                        >

                        </Product>
                    )
                }
            </div>
            <div id="this" className='cart-container'>
                <Cart id={'id'} cart={cart}></Cart>
            </div>
        </div>

    );
};

export default Shop;