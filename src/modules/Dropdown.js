import React,{useState} from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Dropdown({itemList,entityName,setFilter, removeFilterItem,filter}){
    const [show, setShow] = useState(false);
    return (
        <div className="filter-box filter-box-regular" onClick={()=>setShow(!show)}>
            {(filter.hasOwnProperty(entityName))?
                <span>{filter[entityName]}</span>:
                <span style={{"textTransform":"capitalize"}}>{entityName}</span>
            }
            <FontAwesomeIcon icon={faChevronDown} />
            {
                (show)&&
                <ul className="filter-box-dropdown">
                    <li onClick={()=>{setFilter({...removeFilterItem(filter,entityName)});setShow(false)}}>ALL</li>
                    {
                        (itemList!=undefined )? itemList.map(item=><li key={item._id} onClick={()=>{setFilter({...filter,[entityName]:item.name});setShow(false)}}>{item.name}</li>):"" 
                    }
                
                </ul>
            }
        </div>
    )
} 