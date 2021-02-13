import React from 'react'
import AddressView from './AddressView'
import OrderItem from './OrderItem'
export default function OrderListWrapper({order})
{

    const options1 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const getGST=(total)=>{
        return parseFloat((parseInt(total)/100*15).toFixed(2));
    }
    return (

        <div className="order-wrapper">
            <div className="top-info-panel">
                <div className="order-address-wrapper">
                    <div>
                        <span><span style={{fontWeight:"bold"}}>Order Date: </span>{new Intl.DateTimeFormat('en-US', options1).format(new Date(order.date))}</span>   
                        <br/>     
                        <span><span style={{fontWeight:"bold"}}>Reference: </span>{order.reference}</span>
                    </div>
                    <div className="order-address">
                        <h3>Billing Address</h3>
                        <div className="">
                            {order.billingAddress && <AddressView key={order.billingAddress._id} isSelected={false} onClick={()=>{return false;}}  address={order.billingAddress} />}
                        </div>
                    </div>
                    <div className="order-address">
                        <h3>Shipping Address</h3>
                        <div className="">
                            {order.deliveryAddress && <AddressView key={order.deliveryAddress._id} isSelected={false} onClick={()=>{return false;}} address={order.deliveryAddress} />}
                        </div>
                    </div>
                </div>
                
                 <div className="cart-summary">
                    <ul>
                        <li>Sub total: <span>${order.totalPrice-getGST(order.totalPrice)}</span></li>
                        <li>Discount:<span>$0</span></li>
                        <li>GST: <span>${getGST(order.totalPrice)}</span></li>
                        <li><span className="cart-summary-total">Total: ${order.totalPrice}</span></li>
                    </ul>
                </div>
            </div>    
            <ul className="order-items-list">
                {
                      order.hasOwnProperty("products") && order.products.map((product,index)=><li key={index} ><OrderItem id={product._id}
                                    name={product.name} 
                                    price={product.price} 
                                    currency={product.currency}
                                    size={product.sizes} 
                                    image={product.image} 
                                    colour={product.colour} 
                                    qty={product.qty}
                                    /></li>) 
                }
            </ul>
        </div>
            

    )
}