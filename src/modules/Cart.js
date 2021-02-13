import React, { useState, useEffect } from 'react';
import CartItem from './CartItem'
import {updateCart,updateCartProducts,updateCartTotalPrice,updateCartBillingAddress,updateCartDeliveryAddress,promptNotification,hideNotification} from '../redux/actions';
import { useStore,connect} from 'react-redux';
import AddressView from './AddressView';

const mapStateToProps =state=>({
    ...state
})
const mapDispatchToProps=dispatch=>({
    updateCart:(res)=>dispatch(updateCart(res)),
    updateCartProducts:(products)=>dispatch(updateCartProducts(products)),
    updateCartTotalPrice:(totalPrice)=>dispatch(updateCartTotalPrice(totalPrice)),
    updateCartBillingAddress:(address) => dispatch(updateCartBillingAddress(address)),
    updateCartDeliveryAddress:(address) => dispatch(updateCartDeliveryAddress(address)),
    promptNotification:(message)=>dispatch(promptNotification(message)),
    hideNotification:()=>dispatch(hideNotification())
})

function Cart({user,updateCart,updateCartProducts,updateCartTotalPrice,updateCartBillingAddress,updateCartDeliveryAddress,promptNotification,hideNotification}){
    const API_URL = process.env.REACT_APP_API_URL;
    const store = useStore();
    const [total,setTotal] = useState(getTotalFromCart());
    let customer = store.getState().customer;
    let cart =store.getState().cart;

    useEffect(()=>{
        setTotal(getTotalFromCart())
    },[cart])
    function getTotalFromCart(){
        return store.getState().cart.hasOwnProperty("totalPrice")?store.getState().cart.totalPrice:0;
    }
    
    async function submitCart()
    {
        console.log(cart)
        const response = await fetch(API_URL+"cart/submit/"+cart.customer,
        {
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        const res = await response.json();
        window.scrollTo(0, 0);
        if(Object.keys(res).length!==0){
            promptNotification("Order was submitted")
            setTimeout(()=>{
                hideNotification();
            },3000)
        }
    }

    async function selectDeliveryAddress(address){
        
        updateCartDeliveryAddress(address)
        const response = await fetch(API_URL+"cart",{
                headers: {
                    'Content-Type': 'application/json'
                },
                method:"POST",
                body:JSON.stringify(store.getState().cart) 
        });
        const res = await response.json();
        if(res.length!==0){
            console.log(res)
        }
    }
    async function selectBillingAddress(address){
        
        updateCartBillingAddress(address)
        const response = await fetch(API_URL+"cart",{
                headers: {
                    'Content-Type': 'application/json'
                },
                method:"POST",
                body:JSON.stringify(store.getState().cart) 
        });
        const res = await response.json();
        if(res.length!==0){
            console.log(res)
        }
    }
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
                <div>
                    <h2>Billing</h2>
                    <div className="customer-address-wrap">
                        {customer.billingAddress && customer.billingAddress.map(address=><AddressView key={address._id} isSelected={(cart.billingAddress && address._id+""===cart.billingAddress._id+"")} onClick={()=>{selectBillingAddress(address)}}  address={address} />)}
                    </div>
                </div>
                <div>
                    <h2>Shipping</h2>
                    <div className="customer-address-wrap">
                        {customer.deliveryAddress && customer.deliveryAddress.map(address=><AddressView key={address._id} isSelected={(cart.deliveryAddress && address._id+""===cart.deliveryAddress._id+"")} onClick={()=>{selectDeliveryAddress(address)}} address={address} />)}
                    </div>
                </div>
            </div>
            <ul>
                {
                      cart.hasOwnProperty("product") && cart.product.map((product,index)=><li key={index} ><CartItem id={product._id}
                                    name={product.name} 
                                    price={product.price} 
                                    currency={product.currency}
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
                <button style={{float:"right"}} className="btn" onClick={()=>{submitCart()}}>Submit</button>
            </div>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)