import { ADD_TO_DISPLAY_FILTER,LOAD_DISPLAY_FILTER,REMOVE_FROM_DISPLAY_FILTER } from './actions';
var defaultFilter={
    displayDrop:false,
    //page:1,
}
const displayfilter=(state = defaultFilter, action)=> {
    switch(action.type) {
        case ADD_TO_DISPLAY_FILTER:
             console.log("ADD_TO_DISPLAY_FILTER")
            return {
            ...state,
            ...action.data
            };
        case REMOVE_FROM_DISPLAY_FILTER:
            // console.log("REMOVE_FROM_DISPLAY_FILTER");
            if(state.hasOwnProperty(action.data))
                delete state[action.data]
            return {
                ...state
            }
        case LOAD_DISPLAY_FILTER:
            return {
                ...action.data
            };
            
        default:
            return state;
        }
    }
    
    export default displayfilter;