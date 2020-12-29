import { ADD_ONE, MINUS_ONE,
        FETCH_USER ,
        FETCH_PRODUCTS , 
        FETCH_CATEGORIES,
        FETCH_BRANDS, 
        FETCH_COLOURS,
        LOGOUT, 
        LOGIN, 
        ADD_TO_CART, 
        REMOVE_FROM_CART  } from './actions';
    
const initialState = {
  number: 0,
  user:{},
    products:[],
    categories:[],
    brands:[],
    colours:[]
};
const reducer=async(state = initialState, action)=> {
switch(action.type) {
  case ADD_ONE:
      console.log("ADD_ONE")
    return {
      number: state.number + 1
    };
  case MINUS_ONE:
      console.log("MINUS")
    return {
      number: state.number - 1
    };
    case FETCH_USER:    return state;
    case FETCH_PRODUCTS: return state;
    case FETCH_CATEGORIES: 
        console.log(action);
        console.log(state);
        return {
            state
        }
    return state;
    case FETCH_BRANDS: return state;
    case FETCH_COLOURS : return state;
    case LOGOUT: return state;
    case LOGIN : return state;
    case ADD_TO_CART : return state;
    case REMOVE_FROM_CART : return state;
  default:
    return state;
  }
}

export default reducer;