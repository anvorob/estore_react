import React from 'react';

export default function AddressView({address,children,onClick,isSelected}){
    return (
        <div className={(isSelected?"selected ":"")+"address-display"} onClick={onClick} >
            {children}
            <div>{address.streetNumber}</div>
            <div>{address.companyName}</div>
            <div>{address.suburb}</div>
            <div>{address.city} {address.postCode}</div>
        </div>
    )
}