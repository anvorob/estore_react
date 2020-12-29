  import React,{Suspense, lazy,useEffect,useState} from 'react';
  import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
  
  import { Provider } from 'react-redux';
  import { createStore } from 'redux';
  import reducer from './redux/reducers';

  import Footer from './modules/Footer';
  import Header from './modules/Header';
  import Modal from './modules/Modal';
  import Category from './modules/Category';
  import Cart from './modules/Cart';
  import './App.css';
  import ProductDetail from './modules/ProductDetail';
  import ProductSearch from './modules/ProductSearch';
  //import Customer from './modules/Customer';
  import CustomerContainer from './modules/CustomerContainer';


const store = createStore(reducer);

  function App() {

    const API_URL = 'http://localhost:3001/';
    const [categories, setCategories]= useState([]);
    const [products, setProducts]= useState([]);
    const [colours, setColours]= useState([]);
    const [brands, setBrands] = useState([]);
    const [filter, setFilter]= useState({});
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showUserDetails,setShowUserDetails] = useState(false);
    useEffect(()=>{
        getCategories();
        getProducts();
        getBrands();
        getColours();
        getLocalCustomer();
      },[]);

    useEffect(()=>{
      
      var filterStr = Object.keys(filter).map(key=> key+"="+filter[key]).join('&');
        console.log(filterStr);
        getProducts("?"+filterStr);
      },[filter]);
    
      useEffect(()=>{
         getCart()
      },[user])

      function getLocalCustomer(){
        console.log("HERE in local customer"+localStorage['store_customer']);
        if(localStorage['store_customer']!="" && JSON.stringify(user)===JSON.stringify({}))
        setUser(JSON.parse(localStorage['store_customer']))
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
        setProducts(data)
      };

      const getBrands =async()=>{
        const response = await fetch(API_URL+"brands");
        const data = await response.json();
        //console.log(data);
        setBrands(data);
      }

      const getColours = async()=>{
        const response = await fetch(API_URL+"colours");
        const data = await response.json();
        setColours(data);
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
          setUser(result);
        }
        else{
          // display failed login
        }
      }

      async function logOut(){
        const result = await fetch(API_URL+"customers/logout/"+user._id);
        const decode = await result.json();
        if(decode){
          localStorage["store_customer"]="";
          setUser({});
        }
      }

      async function addToCart(productObj){
        const cartObject = {
          products:[productObj],
          customer:user._id
          
        }
        const result = await fetch(API_URL+"cart",{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(cartObject)
        });
        const res = await result.json();
        if(res)
        {
          alert('cart updated');
          setCart([...cart,productObj]);
        }
      }

      async function removeFromCart(productObj){
        const filteredProducts = cart.filter(product=>product._id!==productObj._id);
        console.log(filteredProducts);
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
      <Provider store={store} className="App">
        { showModal && <Modal closeModal={()=>setShowModal(false)}>{formFields()}</Modal>}
          <Header categories={categories} showUserInfo={showUserInfo} customer={user} cart={cart.product||{}} logOut={logOut} showUserDetails={showUserDetails}/>

        <div className="main-area">
          <div className="main-area-wrapper">
            {/* CATEGORY COLUMN AREA  */}
            <Category categories={categories}/>
            
            <Router>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route exact path="/cart" render={()=>(<Cart user={user}/>)} />
                  {/* <Route exact path="/editInfo" render={()=>(<Customer user={user} setUser={setUser}/>)}/> */}
                  <Route exact path="/editInfo" render={()=>(<CustomerContainer/>)}/>
                  {/* <Route exact path="/product/:id" component={ProductDetail} /> */}
                  <Route exact path="/product/:id" render={(routerProps)=>(<ProductDetail {...routerProps} addToCart={addToCart} removeFromCart={removeFromCart}/>)}/>
                  
                  <Route path="/" render={(routerProps)=>(<ProductSearch {...routerProps} setFilter={setFilter} filter={filter} colours={colours} brands={brands} products={products}/>)}/>
                </Switch>
              </Suspense>
            </Router>


        </div>
        </div>

        {/* FOOTER AREA */}
        <Footer/>
      </Provider>
    );
  }

  export default App;
