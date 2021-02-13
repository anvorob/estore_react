import React,{useEffect,useState} from 'react';
import Category from './Category';
import { useStore,connect} from 'react-redux';
function Categories({categories,brands}){
  const store = useStore();
  const filterObject = store.getState().filter;
  function getBrandImage(){
    if(filterObject.hasOwnProperty("brand"))
    {
      
      let arr= brands.filter(item=>item.name==filterObject.brand);
      if(arr.length==0)
        return <div className="logo-spacer"></div>

      if(arr.length==1 && arr[0].image+""!=="")
        return <img className="logo-spacer" src={arr[0].image} />;
      return <div className="logo-spacer"><p>{arr[0].name}</p></div>
    }
    else
      return <div className="logo-spacer"></div>

  }
    return(
        <div className="category-column">
              {getBrandImage()}
              <div className="categories">
              {categories.map((cat,index)=><Category key={index} category={cat}/>)}
                
              </div>
            </div>
    );

}

export default Categories;