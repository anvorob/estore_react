export const FETCH_USER = 'FETCH_USER';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_BRANDS = 'FETCH_BRANDS';
export const FETCH_COLOURS = 'FETCH_COLOURS';
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';
export const UPDATE_CART = 'UPDATE_CART';
export const UPDATE_CART_PRODUCTS = 'UPDATE_CART_PRODUCTS';
export const UPDATE_CART_TOTAL_PRICE = 'UPDATE_CART_TOTAL_PRICE';

export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const LOAD_FAVORITE = "LOAD_FAVORITE";

export const ADD_TO_FILTER = "ADD_TO_FILTER";
export const LOAD_FILTER = "LOAD_FILTER";
export const REMOVE_FROM_FILTER = "REMOVE_FROM_FILTER";

export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

export const ADD_REQUEST_TIMESTAMP = "ADD_REQUEST_TIMESTAMP";
export const REMOVE_REQUEST_TIMESTAMP = "REMOVE_REQUEST_TIMESTAMP";

export const ADD_TO_DISPLAY_FILTER ="ADD_TO_DISPLAY_FILTER";
export const LOAD_DISPLAY_FILTER ="LOAD_DISPLAY_FILTER";
export const REMOVE_FROM_DISPLAY_FILTER = "REMOVE_FROM_DISPLAY_FILTER";

export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const UPDATE_BILLING_ADDRESS = "UPDATE_BILLING_ADDRESS";
export const UPDATE_SHIPPING_ADDRESS = "UPDATE_SHIPPING_ADDRESS";

export const UPDATE_CART_BILLING_ADDRESS = "UPDATE_CART_BILLING_ADDRESS";
export const UPDATE_CART_DELIVERY_ADDRESS = "UPDATE_CART_DELIVERY_ADDRESS";

// CART
export const updateCart =(res)=>({type:'UPDATE_CART',data:res})
export const updateCartProducts =(products)=>({type:'UPDATE_CART_PRODUCTS',data:products});
export const updateCartTotalPrice =(totalPrice)=>({type:'UPDATE_CART_TOTAL_PRICE',data:totalPrice});
export const updateCartBillingAddress = (address)=>({type:'UPDATE_CART_BILLING_ADDRESS', data: address});
export const updateCartDeliveryAddress = (address)=>({type:'UPDATE_CART_DELIVERY_ADDRESS', data: address})

// NOTIFICATIONS
export const promptNotification = (message)=>({type:'SHOW_NOTIFICATION',data:message});
export const hideNotification = ()=>({type:'HIDE_NOTIFICATION'});

// PAGINATION - NAVIGATION //
export const nextPage = (page)=>({type:'ADD_TO_FILTER',data:{"page":page,"update":false}})
export const previousPage = (page)=>({type:'ADD_TO_FILTER',data:{"page":page,"update":false}});
export const setOffset = (offset)=>({type:'ADD_TO_FILTER',data:{"offset":offset,"update":false}});
export const goToPage = (page) => ({type:'ADD_TO_FILTER',data:{"page":page,"update":false}});


// FILTER ACTIONS 
export const addToFilter = (filterObj)=>({type:'ADD_TO_FILTER',data:{...filterObj,"update":true}});
export const loadFilter = (filterObj)=>({type:'LOAD_FILTER',data:{...filterObj,"update":true}});
export const removeFromFilter = (filterObj)=>({type:'REMOVE_FROM_FILTER',data:filterObj});


// DISPLAY FILTER 
export const addToDisplayFilter =(filterObj)=>({type:'ADD_TO_DISPLAY_FILTER',data:{...filterObj}});


export const fetchProducts = (products) =>({type:'FETCH_PRODUCTS',data:products});

export const addRequestTimeStamp = (timestamp) =>({type:'ADD_REQUEST_TIMESTAMP',data:timestamp}); 

export const addCustomer = (customerObj) =>({type:'ADD_CUSTOMER',data:customerObj});
export const updateBillingAddress = (address) =>({type:'UPDATE_BILLING_ADDRESS',data:address});
export const updateShippingAddress = (address) =>({type:'UPDATE_SHIPPING_ADDRESS',data:address});