import React,{useState,useEffect} from 'react';
function ProductEdit({match:{params:{id}},addToCart,addToFav})
{
    const [product,setProduct] = useState({});
    const [colour, setColour] =useState({})
    const [brand, setBrand] =useState("")
    const [name, setName] =useState("")
    const [price, setPrice] =useState("")
    const [sizes, setSizes] =useState([])
    const [image, setImage] =useState()
    const API_URL = 'http://localhost:3001/';
    const getProduct=async(id)=>{
        const response=await fetch(API_URL+"products/"+id,{
            method:"GET"
          });
          const data = await response.json();
        console.log("GET Product")
        if(data){
          setProduct(data)
          setColour(JSON.stringify(data.colour))
          setImage(data.image)
          setSizes(data.size)
          setPrice(data.price)
          setName(data.name)
          setBrand(data.brand)
        }
    }
    useEffect(()=>{
        getProduct(id)
    },[id])
    

    const updateProduct=async()=>
    {
        alert("SEND")
        product.colour=colour;
        // product.brand=brand;
        // product.price=price;
        // product.name=name;
        // product.sizes=sizes;
        // product.image=image;
        const response=await fetch(API_URL+"products/"+id,{
            method:"PATCH",
            headers:{
                'Content-Type':'application/json'
              },
            body:JSON.stringify(product)
          });
          const data = await response.json();
            console.log("GET Product")
            if(data){
            console.log(data)
            }
    }
    console.log(colour)
    return (
        
        <div>
            <p>Name
                <input id="name" value={name} onChange={e=>setName(e.target.value)} type="text"/>
            </p>
            <p>Image
                <img src={image} />
                <input id="image" value={image} onChange={e=>setImage(e.target.value)} type="text"/>
            </p>
            <p>Brand
                <input id="brand" value={brand} onChange={e=>setBrand(e.target.value)} type="text"/>
            </p>
            <p>Colour
                <input id="colour" value={colour} onChange={e=>setColour(e.target.value)} type="text"/>
            </p>
            {/* <input id="name" value={name} onChange={e=>setName(e.target.value)} type="text"/> */}
            <p>Price
            <input id="price" value={price} onChange={e=>setPrice(e.target.value)} type="text"/>
            </p>
            <p>Sizes
            <input id="sizes" value={sizes} onChange={e=>setSizes(e.target.value)} type="text"/>
            </p>


            <div onClick={()=>updateProduct()}>CLICK </div>
        </div>
    )
}

export default ProductEdit;