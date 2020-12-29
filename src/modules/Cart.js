import React, { useState, useEffect } from 'react';
import CartItem from './CartItem'
export default function Cart({user}){
    const API_URL = 'http://localhost:3001/';
    const [product, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(()=>{
        getCart();
    },[user])
    const getCart=async()=>{
        if(user._id==undefined)
        return;
        const response = await fetch(API_URL+"cart/"+user._id,
        {
          method:"GET"

        });
        const res = await response.json();
        if(res.length!==0){
            setProducts(Object.values(res[0].product));
            console.log(res[0]);
            setTotal(res[0].totalPrice);
        }
      }

    const getGST=(total)=>{
        return parseInt(total)/100*15;
    }
    const deleteItem=async(id)=>{

        console.log("Delete item")
        const response = await fetch(API_URL+"cart/"+user._id+"/"+id,{method:"DELETE"});
        const res = await response.json();
        if(res.length!==0){
            setProducts(Object.values(res.product));
            setTotal(res.totalPrice);
        }
    }

    const updateItem=async(id)=>{
        let cart = {
            product,
            customer:user._id
        }
        const response = await fetch(API_URL+"cart",{
                headers: {
                    'Content-Type': 'application/json'
                },
                method:"POST",
                body:JSON.stringify(cart) 
        });
        const res = await response.json();
        if(res.length!==0){
            console.log(res);
        }
    }
    const updateProductQty=(id,e)=>{

        var prod =product.find(element=>element._id===id);
        var index =product.indexOf(prod);
        prod.qty=parseInt(e.target.value);
        product[index] = prod;
        setProducts(Object.values(product));
    }
    
    return (
        <div className="cart-wrapper">
            <h1>Cart</h1>
            <div className="cart-delivery">
                <h1>Address</h1>
            </div>
            <ul>
                {
                    product && product.map(product=><li><CartItem key={product._id} id={product._id}
                                                                    name={product.name} 
                                                                    price={product.price} 
                                                                    size={product.sizes} 
                                                                    image={product.image} 
                                                                    colour={product.colour} 
                                                                    qty={product.qty}
                                                                    updateProductQty={updateProductQty}
                                                                    deleteItem={deleteItem}
                                                                    updateItem={updateItem}/></li>)    
                }
            </ul>
            <div className="cart-summary">
                <ul>
                    <li>Sub total: ${total}</li>
                    <li>Discount:</li>
                    <li>GST: ${getGST(total)}</li>
                    <li>Total: ${total+getGST(total)}</li>
                </ul>
            </div>
        </div>
    )
}