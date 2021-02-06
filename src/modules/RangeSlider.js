import React,{useState} from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Slider from '@material-ui/core/Slider';
import {useStore} from 'react-redux'
export default function RangeSlider({entityName,marks,valuetext,handleChange,valueRange}){
    const [show, setShow] = useState(false);
    const store = useStore();
    const filterObj = store.getState().filter;
    let minFilterPrice = filterObj["price-min"]==undefined?valueRange[0]:filterObj["price-min"];
    let maxFilterPrice = filterObj["price-max"]==undefined?valueRange[1]:filterObj["price-max"];
    valueRange= [minFilterPrice,maxFilterPrice]
    function valuetext(value) {
        return `$${value}`;
      }
      
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
                    {/* <li onClick={()=>{setFilter({...removeFilterItem(filter,entityName)});setShow(false)}}>Reset</li> */}
                    <li>
                    {(marks!=undefined)&&
                                    <Slider
                                    //defaultValue={80}
                                    value={valueRange}
                                    onChange={handleChange}
                                    getAriaValueText={valuetext}
                                    valueLabelDisplay="on"
                                    aria-labelledby="range-slider"
                                    min={marks[0]}
                                    max={marks[1]}
                                    //step={10}
                                    //marks={marks}
                                    
                                    />
                            }
                    </li>
                </ul>
            }
        </div>
    )
}