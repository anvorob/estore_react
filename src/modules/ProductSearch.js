import React,{useEffect,useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import ProductCard from './ProductCard';
import Pagination from './Pagination'
import Dropdown from './Dropdown';
import SorterDropdown from './SorterDropdown';
import RangeSlider from './RangeSlider';
import { useStore,useDispatch,connect} from 'react-redux';
import {setOffset,addToFilter,addRequestTimeStamp,removeFromFilter,loadFilter,fetchProducts} from '../redux/actions'
import { Link } from 'react-router-dom';


const mapStateToProps =state=>({
    ...state
})
const mapDispatchToProps=dispatch=>({
    addToFilter:(filterObj)=>dispatch(addToFilter(filterObj)),
    setOffset:(offset) => dispatch(setOffset(offset)),
    addRequestTimeStamp:(timestamp) => dispatch(addRequestTimeStamp(timestamp)),
    removeFromFilter:(filterObj)=>dispatch(removeFromFilter(filterObj)),
    loadFilter:(filterObj)=>dispatch(loadFilter(filterObj)),
    fetchProducts:(products)=>dispatch(fetchProducts(products)),
})

function ProductSearch ({colours,brands,addToFav,setOffset,addToFilter,addRequestTimeStamp,loadFilter,removeFromFilter,fetchProducts}){
    const [valueRange,setValue] = useState([0,0])
    const [marks, setMarks] = useState([{}]);
    const store = useStore();
    
    var timeoutID =null;
    // const [products,setProducts] =useState(store.getState().product);
    // function render(){
    //     setProducts(store.getState().product);
    // }
    // console.log(store.getState().product)
    // store.subscribe(render);
    let products =  store.getState().product;
    let favorites = store.getState().favorite;
    let filterObj = store.getState().filter;
    let timestamp = store.getState().timestamp;
    if(filterObj.hasOwnProperty("category"))
        brands = brands.filter(item=>item.category+""===filterObj.category+"")
    
    // console.log(products)
    function getTagValue(key,value){
        if(Array.isArray(value))
        {
            return value.join('-')
        }
        else if(key==="sale" && value+"" ==="true")
            return "SALE"
        else if(typeof value==='string')
            return value.toLowerCase()
        else
            return value
    }
    let page = filterObj.page||1;
    let offset =filterObj.offset==undefined?10:filterObj.offset; 
    var uniquePrices = [];
    let arrayOfMarks =[];
    
    useEffect(()=>{
        
        if(products !== undefined){
            uniquePrices = [...new Set(products.map(product =>product.price))]
            
            let minPrice = Math.min(...uniquePrices);
            let maxPrice = Math.max(...uniquePrices);
            setValue([minPrice,maxPrice]);
            arrayOfMarks.push({value:minPrice,label:`$${minPrice}`})
            arrayOfMarks.push({value:maxPrice,label:`$${maxPrice}`})
            setMarks([0,maxPrice+50]);
        }
    },[products])
    // if(products !== undefined)
    // {
    //     uniqueBrands = [...new Set(products.map(product => product.brand))]; 
    //     console.log(uniqueBrands)
    // }
    const handleChange = (event, newValue) => {
        setValue(newValue);
        
        clearTimeout(timestamp.timeoutID);

        // Make a new timeout set to go off in 1000ms (1 second)
        let timeout = setTimeout(function () {
            addToFilter({"price-min":newValue[0],"price-max":newValue[1]})
        }, 1000);
        addRequestTimeStamp({"timeoutID":timeout})
        
      };
      
    const removeFilterItem =(filter,toDelete)=>{
        delete filter[toDelete];
        return filter;
    }
        function valuetext(value) {
            return `$${value}`;
        }

        // const marks = [
        //     {
        //       value: 0,
        //       label: '0°C',
        //     },
        //     {
        //       value: 100,
        //       label: '100°C',
        //     },
        //   ];
        
    {/* MAIN AREA  */}
    return(

        <div className="product-area">
            <div className="history-breadcrumbs">
                <Link to="/">ALL PRODUCTS</Link>
                {
                    filterObj.hasOwnProperty("category")&& Object.keys(filterObj).map(key=>(key==="category"?<Link key={key} to={"/"+key}>/ {filterObj[key]}</Link>:null))
                }
                {
                    filterObj.hasOwnProperty("tag")&& Object.keys(filterObj).map(key=>(key==="tag"?<Link to={"/"+key}>/ {filterObj[key]}</Link>:null))
                }
                {
                    Object.keys(filterObj).map(key=>(key!=="tag"&& key!=="category" && key!=="page" && key!=="update" && key!=="offset" && key!=="price-max" && key!=="price-min" && key!=="sale"?<Link to={"/"+key}>/ {filterObj[key]}</Link>:null))
                }
                
            </div>

            <span className="pageTitle">adidas for Women</span>

            <div className="filter-boxes top-filter-boxes">
                <div onClick={()=>addToFilter({"tag":"women"})} className="filter-box filter-box-top">
                    <span>Women</span>
                </div>
                <div onClick={()=>addToFilter({"tag":"men"}) } className="filter-box filter-box-top">
                    <span>Men</span>
                </div>
            </div>
            <div className="filter-boxes">
            <RangeSlider entityName="price" marks={marks} valueRange={valueRange} handleChange={handleChange} valuetext={valuetext}/>
               
                <Dropdown entityName="colour" itemList={colours} removeFilterItem={removeFilterItem} selectItem={addToFilter} clearSelection={removeFromFilter} />
                <Dropdown entityName="brand" itemList={brands} removeFilterItem={removeFilterItem} selectItem={addToFilter} clearSelection={removeFromFilter} />
                
                <div className="filter-box filter-box-regular disabled">
                    <span>Store</span>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>

            <div className="tags">
                {
                    Object.entries(filterObj).map(([key,value])=>{
                        if(key=="page" || key=="offset" || key=="update")
                        return"";
                        return (
                            <div className="tag" key={key}>
                                <span className="tagTitle">{getTagValue(key,value)}</span>
                                <FontAwesomeIcon onClick={()=>removeFromFilter(key)} icon={faTimes} />
                            </div>
                        )
                    })
                }
                
                <div className="tag clear-tag">
                    <span className="tagTitle" >Reset all</span>
                    <FontAwesomeIcon icon={faTimes} onClick={()=>loadFilter({})} />
                </div>
            </div>

            <div className="result-counter">
                <span>{ ((page-1)*offset+1)+" - "+(((page)*offset<products.length)?(page)*offset:products.length) +" of "+ (products!=undefined?products.length.toLocaleString():0)} PRODUCTS</span>
                <select value={offset} onChange={(e)=>setOffset(e.target.value)}>
                    {/* <option key="1" value="0">All</option> */}
                    <option key="2" value="10">Size per page: 10</option>
                    <option key="3" value="20">Size per page: 20</option>
                    <option key="4" value="40">Size per page: 40</option>
                </select>
                <div className="result-sort">
                    {/* Sort by:popular  */}
                    <SorterDropdown entityName="Sort by" itemList={brands} fetchProducts={fetchProducts} selectItem={addToFilter}  />
                
                </div>
            </div>

            <div className="product-display">

                {(products != undefined) ?
                    products.slice(((page-1)*offset),(page)*offset).map(product => 
                    <ProductCard
                        id={product._id}
                        key={product._id}
                        image={product.image}
                        name={product.name}
                        brand={product.brand}
                        price={product.price}
                        currency={product.currency}
                        price_origin={product.price_origin}
                        
                        sale_percent={product.sale_percent}
                        addToFav={addToFav}
                        isFavorite={favorites.filter(item=>item._id+""===product._id+"").length>0}
                    />) : ""}


            </div>
            <div className="pagination-container">
                <Pagination/>
            </div>
        </div>
    );

}
export default connect(mapStateToProps,mapDispatchToProps)(ProductSearch);