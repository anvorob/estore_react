import { 
    UPDATE_CART, 
    UPDATE_CART_PRODUCTS,
    UPDATE_CART_TOTAL_PRICE,
    UPDATE_CART_BILLING_ADDRESS,
    UPDATE_CART_DELIVERY_ADDRESS
    } from './actions';
    
const cart=(state = {}, action)=> {
  
    switch(action.type) {
        case UPDATE_CART :
            // console.log("UPDATE_CART")
            //console.log(action.data)
            return {
              ...action.data
            }
        case UPDATE_CART_PRODUCTS: 
            // console.log("UPDATE_CART_PRODUCTS")
            state.product=action.data;
            return {
                ...state                
                };
        case UPDATE_CART_TOTAL_PRICE:
          // console.log("UPDATE_CART_TOTAL_PRICE")
          // console.log(state)
          return {
            ...state,
            totalPrice:action.data
          }
        case UPDATE_CART_BILLING_ADDRESS:
          console.log(action)
          return{
            ...state,
            billingAddress:{...action.data}
          }
          case UPDATE_CART_DELIVERY_ADDRESS:
            return{
              ...state,
              deliveryAddress:action.data
            }
      default:
        return state;
      }
    }
    
    export default cart;