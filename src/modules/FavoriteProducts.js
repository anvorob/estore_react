import React from 'react';
import { useDispatch,useStore,connect} from 'react-redux';
import ProductCard from './ProductCard';

export default function FavoriteProducts({addToFav}){
    const store = useStore();
    console.log(store.getState().favorite)
    return (
        <div className="product-area">
                  <h1>Favorite List</h1>
                    <div className="product-display">
                        {store.getState().favorite.map(product => <ProductCard
                            id={product._id}
                            key={product._id}
                            image={product.image}
                            name={product.name}
                            brand={product.brand}
                            price={product.price}
                            currency={product.currency}
                            old_price={product.old_price}
                            sale_percent={product.sale_percent}
                            addToFav={addToFav}
                            isFavorite={true}
                        />) }  
                      </div>
                    </div>
    )
}