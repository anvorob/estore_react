import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
class ProductCard extends React.Component{
    
    constructor(){
        super();
        this.addToFav=this.addToFav.bind(this);
        this.goTo= this.goTo.bind(this);
    }
    goTo(e)
    {
        console.log(this.props.id)
    }
    addToFav(e){
        console.log("add to fav")
    }
    render(){
        //console.log(JSON.stringify(this.props.sale_percent))
        //JSON.stringify(object)==JSON.stringify({})
        return(
            <a className="product-card" href={"product/"+this.props.id}>
                    <div className="image-area">
                        {(this.props.sale_percent!=undefined)?
                        <div className="discount-flag">
                            <span className="discount">{this.props.sale_percent}</span>
                        </div>
                        :""}
                    <FontAwesomeIcon className="favourite-icon" onClick={e=>this.addToFav(this)} icon={faHeart} />
                    <img src={this.props.image}/>
                    </div>
                    <div className="product-caption">
                        <div className="product-price-area">
                        
                        {(this.props.price_origin!=undefined)?
                        <React.Fragment>
                            <span className="product-price sale-price">{this.props.price}</span>
                            <span className="product-price old-price">{this.props.price_origin}</span>
                        </React.Fragment>
                        :
                        <span className="product-price">{this.props.price}</span>
                        }
                        </div>
                        <span className="product-brand">{this.props.brand}</span>
                        <span className="product-description">{this.props.name}</span>
                        <span className="delivery-info">DELIVERY: FREE</span>
                    </div>
            </a>
        )
    }
}

export default ProductCard;