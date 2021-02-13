  import React,{Suspense, lazy,useEffect,useState} from 'react';
  import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
  import { useDispatch,useStore,connect} from 'react-redux';
  

  import Footer from './modules/Footer';
  import Header from './modules/Header';
  import Modal from './modules/Modal';
  import Categories from './modules/Categories';
  import Cart from './modules/Cart';
  import './App.css';
  import FavoriteProducts from './modules/FavoriteProducts';
  import ProductDetail from './modules/ProductDetail';
  import ProductSearch from './modules/ProductSearch';
  import ProductEdit from './modules/ProductEdit';
  import OrderList from './modules/OrderList'
  import CustomerContainer from './modules/CustomerContainer';
  import {promptNotification,hideNotification,goToPage,fetchProducts,updateCart,addToFilter,addCustomer,addToDisplayFilter} from './redux/actions';


  const mapStateToProps =state=>({
    ...state
})
const mapDispatchToProps=dispatch=>({
    promptNotification:(message)=>dispatch(promptNotification(message)),
    hideNotification:()=>dispatch(hideNotification()),
    goToPage:(page) => dispatch(goToPage(page)),
    fetchProducts:(products)=>dispatch(fetchProducts(products)),
    updateCart:(cart)=>dispatch(updateCart(cart)),
    addToFilter:(filterObj)=>dispatch(addToFilter(filterObj)),
    addCustomer:(customerObj) => dispatch(addCustomer(customerObj)),
    addToDisplayFilter:(filterObj)=>dispatch(addToDisplayFilter(filterObj))
})

  function App({hideNotification,promptNotification,goToPage,fetchProducts,updateCart,addToFilter,addCustomer,addToDisplayFilter}) {
    const API_URL = process.env.REACT_APP_API_URL;
    const [categories, setCategories]= useState([]);
    const [colours, setColours]= useState([]);
    const [brands, setBrands] = useState([]);
    const [cart, setCart] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showUserDetails,setShowUserDetails] = useState(false);
    
    const dispatch = useDispatch();
    const store = useStore();
    const filterObj = store.getState().filter;
    const user = store.getState().customer;

    useEffect(()=>{
        getCategories();
        if(Object.keys(getUrlVars()).length==0)
          getProducts();
        getBrands();
        getColours();
        getLocalCustomer();
      },[API_URL]);

      useEffect(()=>{
        const queryString = window.location;
        let urlObject = getUrlVars();
        console.log(Object.keys(urlObject).every(key=>!store.getState().filter.hasOwnProperty(key)))
        // if(Object.keys(urlObject).every(key=>!store.getState().filter.hasOwnProperty(key))){
        //   var filterObj1 = {};
          
        //   Object.keys(urlObject).map(key=> filterObj1[key]=urlObject[key]);
        //   if(Object.keys(filterObj1).length==0)
        //   return;
          
        //   // This is hack to delay url params parsing. Initial non filtered quiry comes after filtered.
        //   setTimeout(()=>{
        //     //dispatch({type:"ADD_TO_FILTER",data:filterObj})
        //     addToFilter(filterObj1)
        //   },500)
          
        // }
        var filterObj1 = {};
          
        Object.keys(urlObject).map(key=> filterObj1[key]=urlObject[key]);
        if(Object.keys(filterObj1).length==0)
        return;
        
        // This is hack to delay url params parsing. Initial non filtered quiry comes after filtered.
        setTimeout(()=>{
          addToFilter(filterObj1)
        },500)
      },getUrlVars())
      function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = decodeURI(value);
        });
        return vars;
    }
    useEffect(()=>{
      //delete(filterObj.requestTimeStamp)
      var filterStr = Object.keys(filterObj).map(key=> key+"="+filterObj[key]).join('&');
      if(window.location.pathname!=="/")
        return ;
        
        window.history.replaceState(window.history.state, "Title", filterStr.length==0?"/":"?"+filterStr);
        if(!filterObj.update)
        return;

        if(filterStr.length>0)
        filterStr="?"+filterStr;
        getProducts(filterStr);
      },[filterObj]);
    
      useEffect(()=>{
         getCart();
         getFavorites();
      },[user])

      const getFavorites=async()=>{
        const response=await fetch(API_URL+"favorite/"+user._id,{
          method:"GET"
        })
        const data = await response.json();
        console.log("GET FAVS")
        if(data){
          dispatch({type:'LOAD_FAVORITE',data:data})
        }
      }
      
      function getLocalCustomer(){
        // console.log("HERE in local customer"+localStorage['store_customer']);
        if(localStorage['store_customer']!="" && JSON.stringify(user)===JSON.stringify({}))
        addCustomer(JSON.parse(localStorage['store_customer']))
      }

      function showUserInfo(){
        if(JSON.stringify(user)===JSON.stringify({}))
          setShowModal(!showModal);
        else
          setShowUserDetails(!showUserDetails);
      }

      const getCart=async()=>{
        if(cart.length>0)
        return;
        if(user._id===undefined)
        return;
        const response = await fetch(API_URL+"cart/"+user._id,
        {
          method:"GET"

        });
        const res = await response.json();
        
        updateCart(res[0]);
        setCart(res);
      }
      const getCategories=async()=>{
        const response=await fetch(API_URL+"categories")
        const data = await response.json();
        setCategories(data)
      };

      const getProducts=async(filter="")=>{
        const response=await fetch(API_URL+"products"+filter)
        const data = await response.json();
        fetchProducts(data)
        if(filterObj.page>Math.ceil(parseInt(data.length)/parseInt(filterObj.offset)))
        {
          goToPage(1);
        }
        //setProducts(data)
        getColours();
      };

      const getBrands =async()=>{
        // let filter = "";
        // if(filterObj.hasOwnProperty("category"))
        //   filter = "?category=Clothing";
        const response = await fetch(API_URL+"brands");
        const data = await response.json();
        //console.log(data);
        setBrands(data);
      }

      const getColours = async()=>{
        // const response = await fetch(API_URL+"colours");
        // const data = await response.json();
        let colours = store.getState().product.reduce((total,item)=>{
          if(item.colour.length>0 && total.every(el=>{return el.name!==item.colour[0].name}))
            return [...total,item.colour[0]]
          else
            return total;
        },[]);
        setColours(colours);
      }

      const loginFormSubmit=async(e)=>{
        e.preventDefault();
        const data = await fetch(API_URL+"customers/login/",
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method:"POST",
          body:JSON.stringify({email,password})
        });
        const result = await data.json();
        if(result)
        {
          setShowModal(false);
          localStorage['store_customer']=JSON.stringify(result);
    
          addCustomer(result)
        }
        else{
          // display failed login
        }
      }

    
    function rerender()
    {
        //console.log(store.getState())
    }
    store.subscribe(rerender)

      async function logOut(){
        const result = await fetch(API_URL+"customers/logout/"+user._id);
        const decode = await result.json();
        if(decode){
          localStorage["store_customer"]="";
          addCustomer({})
        }
      }

      async function addToFav(id){
      
        let isFavorite = store.getState().favorite.filter(item=>item._id===id).length>0
        let productObj =store.getState().product.find(item=>item._id===id);
        delete productObj.sizes;
        const result = await fetch(API_URL+"favorite/"+user._id,{
            method:isFavorite?"DELETE":"POST",
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(productObj)
          });
        const res = await result.json();
        if(res)
        {
          //alert('fav updated');
          promptNotification("Favorite list updated")
          setTimeout(()=>{
              hideNotification();
          },3000)
          console.log(res)
          if(isFavorite)
            dispatch({type:'REMOVE_FAVORITE',data:productObj});
          else
            dispatch({type:"ADD_TO_FAVORITE",data:res})
          
        }
    }

      async function addToCart(productObj){
        const cartObject = {
          product:[productObj],
          customer:user._id
          
        }
        const result = await fetch(API_URL+"cart/additem",{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(cartObject)
        });
        const res = await result.json();
        if(res)
        {
          promptNotification("Item added to your cart")
          setTimeout(()=>{
              hideNotification();
          },3000)
          updateCart(res)
          setCart([...cart,productObj]);
        }
      }

      function formFields(){
        return(
          <form className="login-form" onSubmit={loginFormSubmit}>
            <label>
                <span>Email</span>
                <input type="text" onChange={(e)=>setEmail(e.target.value)}/>
            </label>
            <label>
                <span>Password</span>
                <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            <input type="submit" value="Login"/>
          </form> 
        )
      }
    return (
      <Router>
        { showModal && <Modal closeModal={()=>setShowModal(false)}>{formFields()}</Modal>}
          <Header categories={categories} showUserInfo={showUserInfo} customer={user} cart={cart.product||{}} logOut={logOut} showUserDetails={showUserDetails}/>

        <div className="main-area" onClick={()=>addToDisplayFilter({displayDrop:false})}>
          <div className="main-area-wrapper">
            {/* CATEGORY COLUMN AREA  */}
            <Categories categories={categories} brands ={brands}/>
            
            
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route exact path="/" render={(routerProps)=>(<ProductSearch {...routerProps} addToFav={addToFav} colours={colours} brands={brands} />)}/>
                  
                  {/* <Route exact path="/edit/:id" render={(routerProps)=>(<ProductEdit {...routerProps}/>)}/> */}
                  {/* <Route exact path="/?params" render={()=>(<Cart user={user}/>)} /> */}
                  <Route path="/favorite">
                    <FavoriteProducts addToFav={addToFav}/>
                  </Route>

                  <Route path="/orders" render={()=>(<OrderList user={user}/>)} />

                  <Route path="/cart" render={()=>(<Cart user={user}/>)} />

                  <Route path="/editInfo" render={()=>(<CustomerContainer/>)}/>

                  <Route path="/product/:id" render={(routerProps)=>(<ProductDetail {...routerProps} addToCart={addToCart} addToFav={addToFav}/>)}/>
                  
                </Switch>
              </Suspense>
            


        </div>
        </div>

        {/* FOOTER AREA */}
        <Footer/>
        </Router>
    );
  }

  export default connect(mapStateToProps,mapDispatchToProps)(App);
