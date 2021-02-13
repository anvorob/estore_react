import { 
    UPDATE_CUSTOMER,
ADD_CUSTOMER,UPDATE_BILLING_ADDRESS,UPDATE_SHIPPING_ADDRESS } from './actions';
    
const customer=(state = {}, action)=> {
    
    switch(action.type) {
        case UPDATE_CUSTOMER :
            console.log("UPDATE_CUSTOMER")
            //console.log(action.data)
            return {
              ...action.data
            }
        case ADD_CUSTOMER: 
            console.log("ADD_CUSTOMER")
            return {
                ...action.data
              }
        case UPDATE_BILLING_ADDRESS:
            state.billingAddress=action.data;
            console.log(state.billingAddress)
            return {
                ...state
            }
        case UPDATE_SHIPPING_ADDRESS:
            state.deliveryAddress=action.data;
            return {
                ...state
            }
      default:
        return state;
      }
    }
    
    export default customer;