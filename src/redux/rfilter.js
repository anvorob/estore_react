import { ADD_TO_FILTER,LOAD_FILTER,REMOVE_FROM_FILTER } from './actions';
var defaultFilter={
    offset:10,
    //page:1,
    update:true
}
const filter=(state = defaultFilter, action)=> {
    // console.log(action)
    switch(action.type) {
        case ADD_TO_FILTER:
            // console.log("ADD_TO_FILTER")
            return {
            ...state,
            ...action.data
            };
        case REMOVE_FROM_FILTER:
            // console.log("REMOVE_FROM_FILTER");
            if(state.hasOwnProperty(action.data))
                delete state[action.data]
            return {
                ...state
            }
        case LOAD_FILTER:
            return {
                ...action.data
            };
            
        default:
            return state;
        }
    }
    
    export default filter;