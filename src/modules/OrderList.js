import React, { useEffect, useState } from 'react'
import OrderListWrapper from './OrderListWrapper'
export default function OrderList({user}){
    const [orders, setOrders] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;
    console.log(user)
    useEffect(()=>{
        getOrders()
    },[user])
    const getOrders =async()=>
    {
        if(user._id===undefined)
        return;

        const response=await fetch(API_URL+"order/customer/"+user._id)
        const data = await response.json();
        setOrders(data)
    }
    return (
        
            <ul className="orders-wrapper">
                {orders && orders.map(order=><li><OrderListWrapper  order ={order}/></li>)}
            </ul>
    )
}