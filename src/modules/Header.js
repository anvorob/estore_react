import React,{Link} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faUser,faSearch } from '@fortawesome/free-solid-svg-icons'

function Header({categories,showUserInfo,customer,logOut,showUserDetails,cart}){

    return (
        <React.Fragment>
            
            {/* HEADER AREA  */}
            <header className="header">
                <div className="header-container">
                <ul className="genderLinks">
                    <li>
                    <a href="/women">WOMEN</a>
                    </li>
                    <li>
                    <a href="/men">MEN</a>
                    </li>
                    <li>
                    <a href="/kids">KIDS</a>
                    </li>
                </ul>
                <div className="siteLogo">Stylight</div>
                <ul className="userLinks">
                    <li><FontAwesomeIcon icon={faHeart}/></li>
                    {/* { `<li>${cart.length}</li>`} */}
                    <li onClick={showUserInfo}><FontAwesomeIcon icon={faUser}/> {customer.name||"Login"}
                    { showUserDetails &&
                            <ul className="userDetails">
                                <li><a href="/editInfo">Edit Details</a></li>
                                <li>My Orders</li>
                                <li><a href="/cart">Cart</a></li>
                                <li onClick={logOut}>Logout</li>
                            </ul>
                    }
                    </li>
                    {/* { showUserDetails &&
                        <li className="userDetails">
                            <ul>
                                <li>Edit Details</li>
                                <li>My Orders</li>
                                <li onClick={logOut}>Logout</li>
                            </ul>
                        </li>
                    } */}
                </ul>
                </div>
            </header>

            {/* SUB HEADER AREA  */}
            <div className="sub-header">
                <div className="sub-header-container">
                    
                <ul className="sub-categories">
                    {categories.map((cat,index)=><li key={index}><a href={cat.name.toLowerCase()}>{cat.name.toUpperCase()}</a></li>)}
                    {/* <li><a href="/clothing">CLOTHING</a></li>
                    <li><a href="/clothing">SHOES</a></li>
                    <li><a href="/clothing">ACCESSORIES</a></li>
                    <li><a href="/clothing">BEAUTY</a></li>
                    <li><a href="/clothing">SALE</a></li>
                    <li><a href="/clothing">BRANDS</a></li>
                    <li><a href="/clothing">STORES</a></li> */}
                </ul>
                <div className="searchBar">
                    <FontAwesomeIcon icon={faSearch}/>
                    <input type="text" placeholder="Search"/>
                </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header;