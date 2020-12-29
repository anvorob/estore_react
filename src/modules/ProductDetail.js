import React,{useEffect,useState} from 'react';
import '../ProductDetails.css';

function ProductDetail ({match:{params:{id}},addToCart,removeFromCart},props){
    const [productId, setProductID]=useState({});
    const [product, setProducts]= useState([]);
    const [selectedSize, setSelectedSize]=useState();
    const [sizes,setSizes]=useState({});
    const [sizeType, setSizeType]=useState();
    useEffect(()=>{
        getProducts();
      },[id]);
//console.log(props);
    const getProducts=async()=>{
      const response=await fetch("http://localhost:3001/products/"+id)
      const data = await response.json();
      
      setProducts(data)
      let sizes = groupBy(data.sizes, 'type');
      setSizeType(Object.getOwnPropertyNames(sizes)[0]);
      setSizes(sizes);
    };
 
    var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      
      const selectSize =(size)=>{
        if(!size.isAvailable)
        return;
        
        if(selectedSize!=undefined && selectedSize===size)
        setSelectedSize({});
        else
        setSelectedSize(size);
      }
    
      const changeSizeType=(sizeType)=>{
        setSizeType(sizeType)
      }
    //   useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = "/siema.js";
    //     script.async = true;
    //     document.body.appendChild(script);
    //   return () => {
    //       document.body.removeChild(script);
    //     }
    //   }, []);
      function beforeSendingToCart(){
          if(!selectedSize)
          return;
          
          const newProduct = {...product};
          newProduct.sizes=[{"type":(sizeType.indexOf("93")>-1)?"UK":sizeType.toUpperCase(),"size":selectedSize.size}];
            addToCart(newProduct);
            
        //updateCart({"sizes":selectedSize,"id":product._id})
      }
        if(product!=undefined){
            console.log(product)
        return(
            <div className="product-detail-wrapper">
                <div className="product-image">
                    {(product.images!=undefined)?
                        <div class="slider">
                            
                            {product.images.map((image,index) =><a href={"#slide-"+(index+1)}>{index+1}</a> )}
                            <div class="slides">
                                {product.images.map((image,index) =><div id={"slide-"+(index+1)}>
                                                                    <img src={product.images[index]} />
                                                            </div> )}
                               
                            </div>
                        </div>
                :<img src={product.image} />}
                    
                </div>
                <div className="product-options">
                    <span className="product-brand">{(product.brand!=undefined)?product.brand.name:""}</span>
                    <span className="product-caption">{product.name}</span>
                    <span className="product-colour">WHITE</span>
                    <span className="product-price">{product.price}</span>
                    <div className="product-size-list">
                    {(sizes!=undefined)?
                        Object.getOwnPropertyNames(sizes).map(x=>(x==="null")?"":<React.Fragment>
                                                                        <input checked={x===sizeType} onClick={()=>{setSelectedSize({});setSizeType(x)}} type="radio" id={x} name="gender" value={x}/>
                                                                        <label for={x}>{(x.indexOf("93")>-1)?"UK":x}</label>
                                                                    </React.Fragment>)
                        :""}
                    </div>
                    <ul className="size-options">
                            {(sizes[sizeType]!=undefined)?
                                sizes[sizeType].map(size=><li onClick={()=>selectSize(size)} className={(size.isAvailable?"":"not-available")+" "+ (selectedSize!=undefined && size.size===selectedSize.size?"selected":"")}>{size.size}</li>)
                            :""}
                        
                    </ul>
                    <div className="size-chart"></div>
                    <button className="btn" onClick={beforeSendingToCart}>ADD TO CART</button>
                    <div className="option-buttons">
                        <button className="add-to-fav">FAV</button>
                        <button className="share">SHARE</button>
                    </div>
                    {(product.brandImage!=undefined)?
                    <img className="brand-image" src={product.brandImage}/>
                    :<div className="product-brand"></div>
                    }
                </div>
            </div>
            
        )}else{
            return <React.Fragment/>
        }
        
}

export default ProductDetail;