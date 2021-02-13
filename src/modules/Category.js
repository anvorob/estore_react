import React,{useEffect,useState} from 'react';
import {useDispatch,connect} from 'react-redux'
import {addToFilter} from '../redux/actions'
import { Link } from 'react-router-dom';

const mapStateToProps =state=>({
  ...state
})
const mapDispatchToProps=dispatch=>({
  addToFilter:(filterObj)=>dispatch(addToFilter(filterObj))
})

function Category({category,addToFilter}){ 
    if(category==undefined)
    return "";
    
    return(
      
      <React.Fragment >
        <Link to="/" className="category-title" onClick={()=>addToFilter({"category":category.name})}>{category.name}</Link>
        {category.subCategory &&
          <ul className="subcategory-items-list">{category.subCategory.map((cat,index)=><Category key={index} category={cat} addToFilter={addToFilter}/>)}</ul>
        }
    </React.Fragment>
    );

}

export default connect(mapStateToProps,mapDispatchToProps)(Category);