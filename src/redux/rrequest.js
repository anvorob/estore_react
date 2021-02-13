import { ADD_REQUEST_TIMESTAMP,REMOVE_REQUEST_TIMESTAMP } from './actions';
var defaultFilter={
  
    requestTimeStamp:0
}
const timestamp=(state = defaultFilter, action)=> {
    switch(action.type) {
        case ADD_REQUEST_TIMESTAMP:
            console.log("ADD_REQUEST_TIMESTAMP")
            //console.log(action.data)
            return {
            ...state,
            ...action.data
            };
        case REMOVE_REQUEST_TIMESTAMP:
            console.log("REMOVE_REQUEST_TIMESTAMP");
            if(state.hasOwnProperty(action.data))
                delete state[action.data]
            return {
                ...state
            }
        // case LOAD_FILTER:
        //     return {
        //         ...action.data
        //     };
            
        default:
            return state;
        }
    }
    
    export default timestamp;