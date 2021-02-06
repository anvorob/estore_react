import React,{useState} from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useDispatch,useStore} from 'react-redux'
export default function Dropdown({itemList,entityName}){
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const store = useStore();
    const filterObj = store.getState().filter;
    return (
        <div className="filter-box filter-box-regular" onClick={()=>setShow(!show)}>
            {(filterObj.hasOwnProperty(entityName))?
                <span>{filterObj[entityName]}</span>:
                <span style={{"textTransform":"capitalize"}}>{entityName}</span>
            }
            <FontAwesomeIcon icon={faChevronDown} />
            {
                (show)&&
                <ul className="filter-box-dropdown">
                    <li onClick={()=>{dispatch({type:"REMOVE_FROM_FILTER",data:entityName});setShow(false)}}>ALL</li>
                    {
                        (itemList!=undefined )? itemList.map(item=>
                            <li key={item._id} onClick={()=>{dispatch({type:"ADD_TO_FILTER",data:{[entityName]:item.name}});setShow(false)}}>
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