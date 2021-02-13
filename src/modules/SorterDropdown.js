import React,{useState, useEffect} from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useStore,useDispatch} from 'react-redux'

export default function SorterDropdown({entityName,selectItem,fetchProducts}){
    const [show, setShow] = useState(false);
    const store = useStore();
    const filterObj = store.getState().filter;
    const optionList = [{"title":"Lowest price","direction":0}, {"title":"Highest price","direction":1}]
    const [selectedOption, setOption] = useState(0);
    const dispatch = useDispatch();

    function showDropdown(event,show){
        event.stopPropagation();
        if(show)
            dispatch({type:'ADD_TO_DISPLAY_FILTER',data:{displayDrop:true}})
        setShow(show)
    }

    useEffect(()=>{
        if(store.getState().displayfilter.displayDrop)
        return;
        
        setShow(store.getState().displayfilter.displayDrop);
        
    },[store.getState().displayfilter])
    function sort(direction)
    {
        setOption(direction);
        let sortedProducts = store.getState().product.sort((a, b) => {
            switch(direction)
            {
                case 0: 
                    return a.price - b.price;
                    break;
                case 1: 
                    return b.price - a.price;
                    break;
            }
            
        });
        fetchProducts(sortedProducts)
    }
    return (
        <div className="sort-box" onClick={(e)=>showDropdown(e,!show)}>
            {
                <span style={{"textTransform":"capitalize"}}>{entityName+": "+optionList[selectedOption].title} </span>   
            }
            <FontAwesomeIcon icon={faChevronDown} />
            {
                (show)&&
                <ul className="sort-box-dropdown">
                    
                    {
                        (optionList!=undefined )? optionList.map((item,index)=>
                            <li key={index} onClick={(e)=>{sort(item.direction);showDropdown(e,false)}}>
                                {
                                    item.title
                                }
                                
                            </li>):"" 
                    }
                
                </ul>
            }
        </div>
    )
}