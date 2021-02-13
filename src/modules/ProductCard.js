import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
//import {useStore} from 'react-redux'
import {Link} from 'react-router-dom'
function ProductCard ({id,image,name,brand,price,currency,price_origin,sale_percent,isFavorite,addToFav}){

        return(
            <Link className="product-card" to={{ pathname: '/product/'+id, state: id }}>
                    <div className="image-area">
                        {(sale_percent!=undefined)?
                        <div className="discount-flag">
                            <span className="discount">{sale_percent}</span>
                        </div>
                        :""}
                    <FontAwesomeIcon className={isFavorite ? "favourite-icon":"favourite-icon-empty favourite-icon" } onClick={(e)=>{addToFav(id,e);e.preventDefault()}} icon={faHeart} />
                    <img src={image}/>
                    </div>
                    <div className="product-caption">
                        <div className="product-price-area">
                        
                        {
                        (price_origin)?
                        <React.Fragment>
                            <span className="product-price sale-price">{currency+""+price.toFixed(2)}</span>
                            <span className="product-price old-price">{currency+""+price_origin.toFixed(2)}</span>
                        </React.Fragment>
                        :
                        <span className="product-price">{currency+""+price.toFixed(2)}</span>
                        }
                        </div>
                        <span className="product-brand">{brand}</span>
                        <span className="product-description">{name}</span>
                        <span className="delivery-info">DELIVERY: FREE</span>
                    </div>
            </Link>
        )
    
}

export default ProductCard;