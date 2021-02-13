import React from 'react';
import {connect,useStore} from 'react-redux';
import {updateBillingAddress,updateShippingAddress} from '../redux/actions'
import Address from './Address';
const mapStateToProps =state=>({
  ...state
})
const mapDispatchToProps=dispatch=>({
  updateBillingAddress:(address) =>  dispatch(updateBillingAddress(address)),
  updateShippingAddress:(address) =>  dispatch(updateShippingAddress(address)),
})

function CustomerContainer({updateBillingAddress,updateShippingAddress}){
  const store = useStore();
  var customer =store.getState().customer;
console.log(customer)
      const API_URL = process.env.REACT_APP_API_URL;
      async function onBillingAddressSave(address){
        let addressObj={};
        addressObj.deliveryAddress= customer.deliveryAddress;
        addressObj.billingAddress=updateAddressInArray(customer.billingAddress,address);
        submit(addressObj)
    }
    
    async function onShippingAddressSave(address){
        let addressObj={};
        addressObj.billingAddress= customer.billingAddress;
        addressObj.deliveryAddress=updateAddressInArray(customer.deliveryAddress,address);
        submit(addressObj)
    }

    
    function removeShippingAddress(index)
    {
      let addressObj={};
      customer.deliveryAddress.splice(index,1);
      addressObj.deliveryAddress= customer.deliveryAddress;
      addressObj.billingAddress=customer.billingAddress;
      submit(addressObj)
    }

    function removeBillingAddress(index)
    {
      let addressObj={};
      addressObj.deliveryAddress= customer.deliveryAddress;
      customer.billingAddress.splice(index,1);
      addressObj.billingAddress=customer.billingAddress;
      submit(addressObj)
    }

    function updateAddressInArray(inbound=[], address)
    {
      if(!address.hasOwnProperty("_id"))
      {
        inbound.push(address);
      }
      else 
      {
        let matchAddress = inbound.filter(item=>item._id+""===address._id+"");
        if(matchAddress.length!=0)
        {
          let index = inbound.indexOf(matchAddress)
          inbound.splice(index,1,address);
        }
      }

      return inbound;
    }
    async function submit(addressObj){
      await fetch(API_URL+"customers/"+customer._id,{
          method:"PATCH",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify(addressObj)
      }).then(response => response.json())
      .then(data => {
        localStorage['store_customer']=JSON.stringify(data);
        updateShippingAddress(data.deliveryAddress);
        updateBillingAddress(data.billingAddress);
      });
    }

    return (
            <div>
              <h2 >Hello {customer.name}</h2>
                <p>Last Logged in {new Date(customer.lastLoggedIn).toDateString("dd")}</p>
                <form className="customer-info" onSubmit={()=>{return false;}}>
                <label>
                    <h3>Billing Addresses</h3>
                    <div className="customer-address-wrap">
                        {(customer.billingAddress!=undefined)&& customer.billingAddress.map((address,index)=><Address key={address._id} onAddressSubmit={onBillingAddressSave} index={index} address={address} removeAddress={removeBillingAddress}/>)}
                        <Address onAddressSubmit={onBillingAddressSave} type="billing" />
                    </div>
                </label>
                <label>
                    <h3>Shipping Addresses</h3>
                    <div className="customer-address-wrap">
                        {(customer.deliveryAddress!=undefined)&& customer.deliveryAddress.map((address,index)=><Address key={address._id} onAddressSubmit={onShippingAddressSave} index={index} address={address} removeAddress={removeShippingAddress} />)}
                        <Address onAddressSubmit={onShippingAddressSave} type="shipping" />
                    </div>
                </label>
            </form>
            </div>
          );
    
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomerContainer);