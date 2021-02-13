import React from 'react';

export default function OrderItem({id,price,currency,name,size,colour,image,qty}){

    return (
        <section className="cart-item">
            <div className="cart-item-info">
                <div className="cart-item-img"><img src={image}/></div>
                <div className="cart-item-desc">
                    <h2><a href={"product/"+id}>{name}</a></h2>
                    <div><b>Size:</b> {size.map(size=>size.size + " " +size.type)}</div>
                    <div><b>Colour:</b>{colour && colour.map(item=>item.name)}</div>
                </div>
            </div>
            <div className="cart-item-price-qty">
                <div className="cart-item-qty">{qty||1}</div>
                <span>{" x "}</span>
                <div className="cart-item-price"><p>{currency+""+price.toFixed(2)}</p></div>
                
            </div>
        </section>
    )
}