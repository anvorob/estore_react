import React,{useEffect,useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import ProductCard from './ProductCard';
import Dropdown from './Dropdown';
import RangeSlider from './RangeSlider';

function ProductSearch ({products,setFilter,filter,colours,brands}){
    const [valueRange,setValue] = useState([0,0])
    const [marks, setMarks] = useState([{}]);
    
    var uniqueBrands = [];
    var uniquePrices = [];
    let arrayOfMarks =[];
    useEffect(()=>{
        if(products !== undefined){
            //uniqueBrands = [...new Set(products.map(product => product.brand))];
            uniquePrices = [...new Set(products.map(product =>parseInt(product.price.replace('$',''))))]
            
            
            let minPrice = Math.min(...uniquePrices);
            let maxPrice = Math.max(...uniquePrices);
            setValue([minPrice,maxPrice]);
            arrayOfMarks.push({value:minPrice,label:`$${minPrice}`})
            arrayOfMarks.push({value:maxPrice,label:`$${maxPrice}`})
            setMarks([0,maxPrice+50]);
            // console.log(arrayOfMarks)
        }
    },[products])
    if(products !== undefined){
        uniqueBrands = [...new Set(products.map(product => product.brand))];
        
    }
    //console.log(brands)

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setFilter({"price-min":newValue[0],"price-max":newValue[1]})
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
    //console.log(prdts)
    {/* MAIN AREA  */}
    return(

        <div className="product-area">
            <div className="history-breadcrumbs">
                <a href="/">ALL PRODUCTS</a>/
                <a href="/">FASHION</a>/
                <a href="/">WOMEN</a>/
                <a href="/">ADIDAS</a>
            </div>

            <span className="pageTitle">adidas for Women</span>

            <div className="filter-boxes top-filter-boxes">
                <div className="filter-box filter-box-top">
                    <span>Women</span>
                </div>
                <div className="filter-box filter-box-top">
                    <span>Men</span>
                </div>
            </div>
            <div className="filter-boxes">
            <RangeSlider entityName="price" filter={filter} marks={marks} valueRange={valueRange} handleChange={handleChange} valuetext={valuetext}/>
               
                <Dropdown entityName="colour" itemList={colours} setFilter={setFilter} removeFilterItem={removeFilterItem} filter={filter}/>
                <Dropdown entityName="brand" itemList={brands} setFilter={setFilter} removeFilterItem={removeFilterItem} filter={filter}/>
                
                <div className="filter-box filter-box-regular">
                    <span>Store</span>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>

            <div className="tags">
                {
                    Object.entries(filter).map(([key,value])=>{
                        console.log(value)
                        return (
                            <div className="tag">
                                <span className="tagTitle">{(Array.isArray(value))?value.join('-'):(typeof value==='string')?value.toLowerCase():value}</span>
                                <FontAwesomeIcon onClick={()=>setFilter({...removeFilterItem(filter,key)})} icon={faTimes} />
                            </div>
                        )
                    })
                }
                
                <div className="tag clear-tag">
                    <span className="tagTitle" onClick={()=>setFilter({})}>Reset all</span>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>

            <div className="result-counter">
                <span>{(products!=undefined?products.length.toLocaleString():0)} PRODUCTS</span>
                <div className="result-sort">
                    Sort by:popular
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>

            <div className="product-display">

                {(products != undefined) ?
                    products.map(product => <ProductCard
                        id={product._id}
                        key={product._id}
                        image={product.image}
                        name={product.name}
                        brand={product.brand}
                        price={product.price}
                        old_price={product.old_price}
                        sale_percent={product.sale_percent}
                    />) : ""}


            </div>
        </div>
    );

}

export default ProductSearch;