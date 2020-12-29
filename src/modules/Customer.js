import React, { useState, useEffect } from 'react';
import Address from './Address';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
      number: state.number
    };
  }

function Customer({user,setUser}){
    const API_URL = 'http://localhost:3001/';
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [bAddress, setbAddress] = useState([]);
    const [sAddress,setsAddress] = useState([]);
    useEffect(()=>{
        getCustomerInfo();
    },[user]);

    function getCustomerInfo(){
        setName(user.name);
        setEmail(user.email);
        if(user.billingAddress!=undefined)
        setbAddress([...user.billingAddress]);
        if(user.shippingAddress!=undefined)
        setsAddress([...user.shippingAddress]);
    }


    function onSubmit(e){
        e.preventDefault()
        console.log("SUbmit")
    }

    async function onAddressSubmit(address){
        console.log(address);
        let addressObj={};
        addressObj.billingAddress= [...user.billingAddress, address];
        addressObj.shippingAddress=[...user.shippingAddress, address];
        const result = await fetch(API_URL+"customers/"+user._id,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(addressObj)
        });
        console.log(result.json());
        setUser({...user,billingAddress:addressObj.billingAddress,shippingAddress:addressObj.shippingAddress});
    }

    return (
        <div className="customer-info-wrapper">
            <h1>{name}</h1>
            <div>Email
                <p>{email}</p>
            </div>
            <form className="customer-info" onSubmit={onSubmit}>
                <label>
                    <h3>Billing Addresses</h3>
                    <div className="customer-address-wrap">
                        {(bAddress!=undefined)&& bAddress.map(address=><Address key={address._id} onAddressSubmit={onAddressSubmit} address={address} type="billing"/>)}
                        <Address onAddressSubmit={onAddressSubmit} type="billing" />
                    </div>
                </label>
                <label>
                    <h3>Shipping Addresses</h3>
                    <div className="customer-address-wrap">
                        {(sAddress!=undefined)&& sAddress.map(address=><Address key={address._id} onAddressSubmit={onAddressSubmit} address={address} type="shipping" />)}
                        <Address onAddressSubmit={onAddressSubmit} type="shipping" />
                    </div>
                </label>
                <input type="submit" value="Save"/>
            </form>
        </div>
    )
}

export default connect(mapStateToProps)(Customer);