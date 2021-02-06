import React from 'react'

export default function CartItem({id,price,name,size,colour,image,qty,updateProductQty,deleteItem,updateItem,updated}){

    return(
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
                <div className="cart-item-qty"><input type="number" value={qty??1} onChange={(e)=>updateProductQty(id,size,e)}/></div>
                <div className="cart-item-price"><p>{price}</p></div>
                <div className="cart-item-action">
                    {updated&&
                        <span onClick={updateItem}>Update</span>
                    }
                    <span onClick={()=>deleteItem(id,size)}>Delete</span>
                </div>
            </div>
        </section>
    )
}