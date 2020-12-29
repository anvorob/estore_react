import React,{useState} from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Slider from '@material-ui/core/Slider';

export default function RangeSlider({entityName,filter,marks,valuetext,handleChange,valueRange}){
    const [show, setShow] = useState(false);
    function valuetext(value) {
        return `$${value}`;
      }
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