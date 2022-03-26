import React from 'react';
import './Product.css';

const Product =  ( {product,handleAddToCart}) => {
    const {name,img,seller,price,ratings}=product;
    return (
        <div className='product'>
            <img src={img} alt="" />
    
           <div className='product-info'>
             <p className='product-name' style={{fontSize:'20px'}}>{name}</p>
             <p>price: ${price}</p>
             <p><small>seller: {seller}</small></p>
             <p>ratings: {ratings}</p>
             </div>
           
           <button onClick={()=>handleAddToCart(product)} className='btn-cart'>
                 <p className='btn-text'>Add to cart</p>
             </button>
        </div>
    );
};

export default Product;