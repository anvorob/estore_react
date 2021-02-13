import React,{useEffect,useState} from 'react';
import '../ProductDetails.css';
import { useStore,connect} from 'react-redux';
import {promptNotification,hideNotification} from '../redux/actions';
const mapStateToProps =state=>({
  ...state
})
const mapDispatchToProps=dispatch=>({
  promptNotification:(message)=>dispatch(promptNotification(message)),
  hideNotification:()=>dispatch(hideNotification())
})

function ProductDetail ({match:{params:{id}},addToCart,addToFav,promptNotification,hideNotification},props){

    const [product, setProduct]= useState({});
    const [selectedSize, setSelectedSize]=useState();
    const [sizes,setSizes]=useState({});
    const [selectedImage,setSelectedImage] = useState(0);
    const [sizeType, setSizeType]=useState();
    const store = useStore();
    
    useEffect(()=>{
        getProduct();
      },[]);

    function rerender()
    {
        console.log(store.getState())
    }
    const listenForChanges =store.subscribe(rerender)
    listenForChanges();
    const getProduct=async()=>{
      
      let productStore =store.getState().product.find(item=>item._id===id);
      if(productStore==undefined){
        const response=await fetch(process.env.REACT_APP_API_URL+""+id)
        productStore = await response.json();
        
        setProduct(productStore)
      }else{
        setProduct(productStore)
      }
        if(productStore!=undefined){
        let sizes = groupBy(productStore.sizes, 'type');
        setSizeType(Object.getOwnPropertyNames(sizes)[0]);
        setSizes(sizes);
      }
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
   
      function beforeSendingToCart(){
          if(selectedSize==undefined || JSON.stringify(selectedSize)===JSON.stringify({}))
          {
            promptNotification("Size is not selected")
            setTimeout(()=>{
                hideNotification();
            },3000)
            return;
          }
          const newProduct = {...product};
          newProduct.sizes=[{"type":(sizeType.indexOf("93")>-1)?"UK":sizeType.toUpperCase(),"size":selectedSize.size}];
            addToCart(newProduct);
            
        //updateCart({"sizes":selectedSize,"id":product._id})
      }
      function getAllColours(){
        if(product.colour!=undefined && product.colour.length>0)
        {
          let str="";
          product.colour.map((item,index)=>str+=item.name.toUpperCase()+" ");
          return str;//product.colour.reduce((string,item,index)=>string+=item.name+((product.colour.length==0 || product.colour.length==index-1)?"":"/"))
        }
        return "";
      }
        if(product!=undefined){
          //console.log("PRODUCT DETAIL")  
        return(
            <div className="product-detail-wrapper">
                <div className="product-image">
                    
                  {(product.images!=undefined)?
                          <div >
                              <img className="image-preview-main" src={product.images[selectedImage]} />
                              <div className="image-preview-wrapper">
                                  {product.images.map((image,index) =><div className="image-preview-item" key={index} onClick={()=>setSelectedImage(index)}>
                                                                      <img src={product.images[index]} />
                                                              </div> )}
                                
                              </div>
                          </div>
                  :<img src={product.image} />}
                </div>
                <div className="product-options">
                    <span className="product-brand">{(product.brand!=undefined)?product.brand.name:""}</span>
                    <span className="product-caption">{product.name}</span>
                    <span className="product-colour">{getAllColours()}</span>
                    <span className="product-price">{product.price}</span>
                    <div className="product-size-list">
                    {(sizes!=undefined)?
                        Object.getOwnPropertyNames(sizes).map((x,index)=>(x==="null")?""
                                        :<React.Fragment key={index}>
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
                        <button className="add-to-fav" onClick={()=>addToFav(id)}>FAVORITE</button>
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

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);