import { 
    UPDATE_CART, 
    UPDATE_CART_PRODUCTS,
    UPDATE_CART_TOTAL_PRICE  } from './actions';
    
const cart=(state = {}, action)=> {
  //console.log(action)
    switch(action.type) {
        case UPDATE_CART :
            console.log("UPDATE_CART")
            //console.log(action.data)
            return {
              ...action.data
            }
        case UPDATE_CART_PRODUCTS: 
            console.log("UPDATE_CART_PRODUCTS")
            state.product=action.data;
            return {
                ...state                
                };
        case UPDATE_CART_TOTAL_PRICE:
          console.log("UPDATE_CART_TOTAL_PRICE")
          console.log(state)
          return {
            ...state,
            totalPrice:action.data
          }
      default:
        return state;
      }
    }
    
    export default cart;