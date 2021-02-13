import { ADD_TO_FAVORITE,REMOVE_FAVORITE,LOAD_FAVORITE } from './actions';
const favorite=(state = [], action)=> {
    switch(action.type) {
      case ADD_TO_FAVORITE:
          // console.log("ADD_TO_FAVORITE")
          
        return [
          ...state,
          action.data
        ];
      case REMOVE_FAVORITE:
          // console.log("REMOVE_FAVORITE")
          let index = state.indexOf(state.filter(item=>item._id===action.data._id));
        return [
          ...state.slice(0,index),
          ...state.slice(index+1),
        ];
        case LOAD_FAVORITE:
        return [
            ...action.data
        ];
         
      default:
        return state;
      }
    }
    
    export default favorite;