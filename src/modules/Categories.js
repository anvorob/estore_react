import React,{useEffect,useState} from 'react';
import Category from './Category';
function Categories({categories}){

  //console.log(categories)
    return(
        <div className="category-column">
              <img src={require('../images/logo.png')} alt="Brand Logo"/>
              <div className="categories">
              {categories.map((cat,index)=><Category key={index} category={cat}/>)}
                
              </div>
            </div>
    );

}

export default Categories;