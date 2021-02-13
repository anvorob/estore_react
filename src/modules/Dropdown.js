import React,{useState,useEffect} from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useStore,useDispatch} from 'react-redux'
export default function Dropdown({itemList,entityName,selectItem,clearSelection}){
    const [show, setShow] = useState(false);
    const store = useStore();
    const filterObj = store.getState().filter;
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
    return (
        <div className="filter-box filter-box-regular" onClick={(e)=>showDropdown(e,!show)}>
            {(filterObj.hasOwnProperty(entityName))?
                <span style={{"textTransform":"capitalize"}}>{entityName+": "+filterObj[entityName]}</span>:
                <span style={{"textTransform":"capitalize"}}>{entityName}</span>
            }
            <FontAwesomeIcon icon={faChevronDown} />
            {
                (show)&&
                <ul className="filter-box-dropdown">
                    <li onClick={()=>{clearSelection(entityName);setShow(false)}}>ALL</li>
                    {
                        (itemList!=undefined )? itemList.map(item=>
                            <li key={item._id} onClick={(e)=>{selectItem({[entityName]:item.name});showDropdown(e,false)}}>
                                {
                                    item.name
                                }
                                {
                                    item.sample &&
                                    <div className="dropdown-colour-sample" style={{backgroundColor: item.sample}}></div>
                                }
                            </li>):"" 
                    }
                
                </ul>
            }
        </div>
    )
} 