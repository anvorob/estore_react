import React,{useEffect,useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import ProductCard from './ProductCard';
import Pagination from './Pagination'
import Dropdown from './Dropdown';
import RangeSlider from './RangeSlider';
import { useStore,useDispatch,connect} from 'react-redux';
import {setOffset,addToFilter} from '../redux/actions'
import { Link } from 'react-router-dom';

const mapStateToProps =state=>({
    ...state
})
const mapDispatchToProps=dispatch=>({
    addToFilter:(filterObj)=>dispatch(addToFilter(filterObj)),
    setOffset:(offset) => dispatch(setOffset(offset))
})

function ProductSearch ({colours,brands,addToFav,setOffset,addToFilter}){
    const [valueRange,setValue] = useState([0,0])
    const [marks, setMarks] = useState([{}]);
    const store = useStore();
    const dispatch = useDispatch();
    var timeoutID =null;
    // const [products,setProducts] =useState(store.getState().product);
    // function render(){
    //     setProducts(store.getState().product);
    // }
    // console.log(store.getState().product)
    // store.subscribe(render);
    let products =store.getState().product;
    let favorites = store.getState().favorite;
    let filterObj = store.getState().filter;
    let page = filterObj.page||1;
    let offset =filterObj.offset==undefined?10:filterObj.offset; 
    var uniqueBrands = [];
    var uniquePrices = [];
    let arrayOfMarks =[];
    
    useEffect(()=>{
        
        if(products !== undefined){
            //uniqueBrands = [...new Set(products.map(product => product.brand))];
            //console.log(products.map(product =>(product.price===undefined)?product:parseInt(product.price.replace('$',''))))
            uniquePrices = [...new Set(products.map(product =>product.price))]
            
            let minPrice = Math.min(...uniquePrices);
            let maxPrice = Math.max(...uniquePrices);
            setValue([minPrice,maxPrice]);
            arrayOfMarks.push({value:minPrice,label:`$${minPrice}`})
            arrayOfMarks.push({value:maxPrice,label:`$${maxPrice}`})
            setMarks([0,maxPrice+50]);
        }
    },[products])
    if(products !== undefined)
    {
        uniqueBrands = [...new Set(products.map(product => product.brand))]; 
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
        
        clearTimeout(filterObj.requestTimeStamp);

        // Make a new timeout set to go off in 1000ms (1 second)
        let timeout = setTimeout(function () {
            addToFilter({"price-min":newValue[0],"price-max":newValue[1]})
        }, 1000);
        addToFilter({"requestTimeStamp":timeout})
        
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
                    Object.keys(filterObj).map(key=>(key!=="tag"&& key!=="category" && key!=="page" && key!=="offset" && key!=="price-max" && key!=="price-min"?<Link to={"/"+key}>/ {filterObj[key]}</Link>:null))
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
               
                <Dropdown entityName="colour" itemList={colours} removeFilterItem={removeFilterItem} />
                <Dropdown entityName="brand" itemList={brands} removeFilterItem={removeFilterItem} />
                
                <div className="filter-box filter-box-regular">
                    <span>Store</span>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>

            <div className="tags">
                {
                    Object.entries(filterObj).map(([key,value])=>{
                        if(key=="page" || key=="offset")
                        return"";
                        return (
                            <div className="tag" key={key}>
                                <span className="tagTitle">{(Array.isArray(value))?value.join('-'):(typeof value==='string')?value.toLowerCase():value}</span>
                                <FontAwesomeIcon onClick={()=>dispatch({type:"REMOVE_FROM_FILTER",data:key})} icon={faTimes} />
                            </div>
                        )
                    })
                }
                
                <div className="tag clear-tag">
                    <span className="tagTitle" >Reset all</span>
                    <FontAwesomeIcon icon={faTimes} onClick={()=>dispatch({type:"LOAD_FILTER",data:{}})} />
                </div>
            </div>

            <div className="result-counter">
                <span>{ ((page-1)*offset+1)+" - "+(((page)*offset<products.length)?(page)*offset:products.length) +" of "+ (products!=undefined?products.length.toLocaleString():0)} PRODUCTS</span>
                <select value={offset} onChange={(e)=>setOffset(e.target.value)}>
                    <option key="1" value="0">All</option>
                    <option key="2" value="10">10</option>
                    <option key="3" value="20">20</option>
                    <option key="4" value="40">40</option>
                </select>
                <div className="result-sort">
                    Sort by:popular
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>

            <div className="product-display">

                {(products != undefined) ?
                    products.slice(((page-1)*offset),(page)*offset).map(product => <ProductCard
                        id={product._id}
                        key={product._id}
                        image={product.image}
                        name={product.name}
                        brand={product.brand}
                        price={product.price}
                        currency={product.currency}
                        price_origin={product.price_origin}
                        old_price={product.old_price}
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