import { FETCH_PRODUCTS , 
    FETCH_CATEGORIES,
    FETCH_BRANDS, 
    FETCH_COLOURS
    } from './actions';

const product=(state = [], action)=> {
    switch(action.type) {
     
        // case FETCH_USER:    return state;
        case FETCH_PRODUCTS:
        //console.log(state)  
        return [
          ...action.data
        ];
        // case FETCH_CATEGORIES: 
        //     console.log(action);
        //     console.log(state);
        //     return {
        //         ...state
        //     }
        // return state;
        // case FETCH_BRANDS: return state;
        // case FETCH_COLOURS : return state;
        
         
      default:
        return state;
      }
    }
    
    export default product;