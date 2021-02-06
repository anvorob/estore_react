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
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION"

export const updateCart =(res)=>({type:'UPDATE_CART',data:res})
export const updateCartProducts =(products)=>({type:'UPDATE_CART_PRODUCTS',data:products})
export const updateCartTotalPrice =(totalPrice)=>({type:'UPDATE_CART_TOTAL_PRICE',data:totalPrice})

export const promptNotification = (message)=>({type:'SHOW_NOTIFICATION',data:message});
export const hideNotification = ()=>({type:'HIDE_NOTIFICATION'});

export const nextPage = (page)=>({type:'ADD_TO_FILTER',data:{page}})
export const previousPage = (page)=>({type:'ADD_TO_FILTER',data:{page}});
export const setOffset = (offset)=>({type:'ADD_TO_FILTER',data:{offset}});
export const goToPage = (page) => ({type:'ADD_TO_FILTER',data:{page}});

export const addToFilter = (filterObj)=>({type:'ADD_TO_FILTER',data:filterObj});
export const loadFilter = (filterObj)=>({type:'LOAD_FILTER',data:filterObj});
export const removeFromFilter = (filterObj)=>({type:'REMOVE_FROM_FILTER',data:filterObj});

export const fetchProducts = (products) =>({type:'FETCH_PRODUCTS',data:products})