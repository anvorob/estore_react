import React, { useState, useEffect } from 'react';
import CartItem from './CartItem'
import {updateCart,updateCartProducts,updateCartTotalPrice} from '../redux/actions';
import { useStore,connect} from 'react-redux';

const mapStateToProps =state=>({
    ...state
})
const mapDispatchToProps=dispatch=>({
    updateCart:(res)=>dispatch(updateCart(res)),
    updateCartProducts:(products)=>dispatch(updateCartProducts(products)),
    updateCartTotalPrice:(totalPrice)=>dispatch(updateCartTotalPrice(totalPrice))
})

function Cart({user,updateCart,updateCartProducts,updateCartTotalPrice}){
    const API_URL = 'http://localhost:3001/';
    const store = useStore();
    const [cart, setCart] = useState(store.getState().cart||{});
    const [total,setTotal] = useState(getTotalFromCart());
    
    useEffect(()=>{
        setTotal(getTotalFromCart())
    },[cart])
    function getTotalFromCart(){
        return store.getState().cart.hasOwnProperty("totalPrice")?store.getState().cart.totalPrice:0;
    }
    function rerender()
    {
        setCart(store.getState().cart);
        //console.log("RERENDER")
        //console.log(store.getState())
        
    }
    const re =store.subscribe(rerender)

    const getGST=(total)=>{
        return parseFloat((parseInt(total)/100*15).toFixed(2));
    }
    const deleteItem=async(id,size)=>
    {
        const filteredProducts = cart.product.filter(product=>product._id===id && JSON.stringify(product.sizes)===JSON.stringify(size));
        const response = await fetch(API_URL+"cart/"+user._id,
        {
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(filteredProducts)
        }
        );
        const res = await response.json();
        if(Object.keys(res).length!==0){
            console.log(res)
            updateCart(res)
            setCart(res);
        }
    }

    const updateItem=async()=>{
        let cart = {
            product:store.getState().cart.product.map(item=>({...item,updated:false})),
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
            updateCartProducts(Object.values(res.product))
            updateCartTotalPrice(res.totalPrice)
        }
    }
    const updateProductQty=(id,size,e)=>{
        let product = store.getState().cart.product;
        var prod =product.find(element=>element._id===id && element.sizes[0].size===size[0].size && element.sizes[0].type===size[0].type);
        prod.updated = true;
        var index =product.indexOf(prod);
        prod.qty=parseInt(e.target.value);
        product[index] = prod;
        updateCartProducts(Object.values(product));
    }
    
    return (
        <div className="cart-wrapper">
            <h1>Cart</h1>
            <div className="cart-delivery">
                <h1>Address</h1>
            </div>
            <ul>
                {
                      cart.hasOwnProperty("product") && cart.product.map((product,index)=><li key={index} ><CartItem id={product._id}
                                    name={product.name} 
                                    price={product.price} 
                                    size={product.sizes} 
                                    image={product.image} 
                                    colour={product.colour} 
                                    qty={product.qty}
                                    updated={product.updated||false}
                                    updateProductQty={updateProductQty}
                                    deleteItem={deleteItem}
                                    updateItem={updateItem}/></li>) 
                }
            </ul>
            <div className="cart-summary">
                <ul>
                    <li>Sub total: <span>${total-getGST(total)}</span></li>
                    <li>Discount:<span>$0</span></li>
                    <li>GST: <span>${getGST(total)}</span></li>
                    <li><span className="cart-summary-total">Total: ${total}</span></li>
                </ul>
            </div>
            <div >
                <button style={{float:"right"}} className="btn">Submit</button>
            </div>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)