import React,{useEffect,useState} from 'react';
import {useDispatch} from 'react-redux'
function Category({category}){
  const dispatch = useDispatch();  
    if(category==undefined)
    return "";
    
    return(
      
      <React.Fragment >
        <span className="category-title" onClick={()=>dispatch({type:'ADD_TO_FILTER',data:{"category":category.name}})}>{category.name}</span>
        {category.subCategory &&
          <ul className="subcategory-items-list">{category.subCategory.map((cat,index)=><Category key={index} category={cat}/>)}</ul>
        }
    </React.Fragment>
    );

}

export default Category;