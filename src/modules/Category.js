import React,{useEffect,useState} from 'react';

function Category({categories}){

  console.log(categories)
    return(
        <div className="category-column">
              <img src={require('../images/logo.png')} alt="Brand Logo"/>
              <div className="categories">
                {categories.map((cat,index)=><React.Fragment key={index}>
                                          <span className="category-title">{cat.name}</span>
                                          <ul className="subcategory-items-list">{cat.subCategory.map((subCat,index)=><li key={index}><a href="#">{subCat.name}</a></li>)}</ul>
                                      </React.Fragment>)}
                
                {/* <ul className="subcategory-items-list">
                  <li><a href="#">Summer Shoes</a></li>
                  <li><a href="#">Sneakers</a></li>
                  <li><a href="#">Leather Shoes</a></li>
                  <li><a href="#">Sports Shoes</a></li>
                  <li><a href="#">Sandals</a></li>
                  <li><a href="#">Slippers</a></li>
                  <li><a href="#">Boots</a></li>
                  <li><a href="#">Winter Shoes</a></li>
                </ul> */}
              </div>
            </div>
    );

}

export default Category;