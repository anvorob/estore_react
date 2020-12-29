import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
export default function Address({address, onAddressSubmit,type}){
    
    //let InternalAddress ={};
    const [editState, setEditState] = useState(false);
    const [InternalAddress, setInternalAddress] = useState({});
    useEffect(()=>{
        console.log(address);
        if(address!=undefined){
            
            setInternalAddress(address);
        }
        else{
            setEditState(true);
        }
    },[address])
    function onAddressSave(e){
        e.preventDefault();
        InternalAddress.type=type;
        onAddressSubmit(InternalAddress);
        setEditState(false);
    }

    function onAddressItemChange(e){
        setInternalAddress({...InternalAddress,[e.target.name]:e.target.value});
    }

    function getCancelOrResetBtn(){
        if(InternalAddress.hasOwnProperty("_id"))
        return <input type="button" onClick={()=>{setEditState(false)}} className="button button-negative" value="Cancel"/>;
        else 
        return <input type="reset" onClick={()=>{setInternalAddress({})}} className="button button-negative" value="Reset"/>
    }
    if(!editState)
        return(
            <div className="address-display">
                <div className="address-actions">
                    <div onClick={()=>{setEditState(true)}}><FontAwesomeIcon icon={faPen} /></div>
                    <div onClick={()=>{setEditState(true)}}><FontAwesomeIcon icon={faTrashAlt} /></div>
                </div>
                <div>{InternalAddress.streetNumber}</div>
                <div>{InternalAddress.companyName}</div>
                <div>{InternalAddress.suburb}</div>
                <div>{InternalAddress.city} {InternalAddress.postCode}</div>
            </div>
        )
    else
        return(
            <div className="address-edit">
                <form onSubmit={onAddressSave}>
                    <label>
                        Street Number
                        <input type="text" name="streetNumber" value={InternalAddress.streetNumber} onChange={(e)=>onAddressItemChange(e)}/>
                    </label>
                    <label>
                        Company
                        <input type="text" name="companyName" value={InternalAddress.companyName} onChange={(e)=>onAddressItemChange(e)}/>
                    </label>
                    <label>
                        Suburb
                        <input type="text" name="suburb" value={InternalAddress.suburb} onChange={(e)=>onAddressItemChange(e)}/>
                    </label>
                    <label>
                        City
                        <input type="text" name="city" value={InternalAddress.city} onChange={(e)=>onAddressItemChange(e)}/>
                    </label>
                    <label>
                        Post Code
                        <input type="text" name="postCode" value={InternalAddress.postCode} onChange={(e)=>onAddressItemChange(e)}/>
                    </label>
                    <div className="address-actions">
                        <input type="submit" value="Save" className="button button-positive"/>
                        {getCancelOrResetBtn()}
                    </div>
                </form>
            </div>
        )
}