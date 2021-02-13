import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faUser,faSearch } from '@fortawesome/free-solid-svg-icons'
import { useStore,connect} from 'react-redux';
import { Link } from 'react-router-dom';
import NotificationBox from './NotificationBox';
import {addToFilter,loadFilter,removeFromFilter,addToDisplayFilter} from '../redux/actions'

const mapStateToProps =state=>({
    ...state
})
const mapDispatchToProps=dispatch=>({
    addToFilter:(filterObj)=>dispatch(addToFilter(filterObj)),
    loadFilter:(filterObj)=>dispatch(loadFilter(filterObj)),
    removeFromFilter:(filterObj)=>dispatch(removeFromFilter(filterObj)),
    addToDisplayFilter:(filterObj)=>dispatch(addToDisplayFilter(filterObj))
})

function Header(props){
    const {categories,showUserInfo,customer,logOut,showUserDetails,cart,addToFilter,loadFilter,removeFromFilter,addToDisplayFilter} = props;
    let timeout = null;
    const store = useStore();
    const numberOfFavItems = store.getState().favorite.length;
    const notification = store.getState().notification;
    const products = store.getState().product;
    // function rerender()
    // {
    //     console.log(store.getState())
    // }
    // store.subscribe(rerender)

    function searchProduct(e){
        clearTimeout(timeout);

        // Make a new timeout set to go off in 1000ms (1 second)
        timeout = setTimeout(function (value) {
            if(value==="")
                removeFromFilter("query") 
            else
                addToFilter({"query":value}) 
        }, 1000,e.target.value); 
    }

    return (
        <React.Fragment>
            
            {/* HEADER AREA  */}
            <header className="header"  onClick={()=>addToDisplayFilter({displayDrop:false})}>
                <div className="header-container">
                <ul className="genderLinks">
                    <li>
                    <Link to="/" onClick={()=>addToFilter({"tag":"women"})}>WOMEN </Link>
                    </li>
                    <li>
                    <Link to="/" onClick={()=>addToFilter({"tag":"men"})}>MEN</Link>
                    </li>
                    <li>
                    <Link to="/" onClick={()=>addToFilter({"tag":"kids"})}>KIDS</Link>
                    </li>
                </ul>
                <Link to="/" className="siteLogo" onClick={()=>loadFilter({})}>Stylight</Link>
                <ul className="userLinks">
                    <li><Link to="/favorite" style={{color:"white"}}><FontAwesomeIcon icon={faHeart}/><span className="fav-number">{numberOfFavItems}</span></Link></li>
                    <li onClick={showUserInfo}><FontAwesomeIcon icon={faUser}/> {customer.name||"Login"}
                    { showUserDetails &&
                            <ul className="userDetails">
                                <li><Link to="/editInfo">Edit Details</Link></li>
                                <li><Link to="/orders">My Orders</Link></li>
                                <li><Link to="/cart">Cart</Link></li>
                                <li onClick={logOut}>Logout</li>
                            </ul>
                    }
                    </li>
                    
                </ul>
                </div>
            </header>

            {/* SUB HEADER AREA  */}
            <div className="sub-header" onClick={()=>addToDisplayFilter({displayDrop:false})}>
                <div className="sub-header-container">
                    {   notification.isVisible &&  
                        <NotificationBox>
                            {notification.message}
                        </NotificationBox>
                    }
                    <ul className="sub-categories">
                        {categories.map((cat,index)=><li key={index}><Link to="/" onClick={()=>addToFilter({"category":cat.name})}>{cat.name.toUpperCase()}</Link></li>)}
                        {products.filter(item=>item.price_origin!==undefined || item.price_origin!==null).length>0 && <li><Link to="/" className="sale-link" onClick={()=>addToFilter({"sale":true})}>SALE</Link></li>}
                    </ul>
                    <div className="searchBar">
                        <FontAwesomeIcon icon={faSearch}/>
                        <input type="text" onKeyUp={e=>searchProduct(e)} placeholder="Search"/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);