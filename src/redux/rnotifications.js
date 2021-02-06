import { SHOW_NOTIFICATION,HIDE_NOTIFICATION} from './actions';
let initialState={
    isVisible:false,
    message:""
}
const notification=(state = initialState, action)=> {
    switch(action.type) {
      case HIDE_NOTIFICATION:
          console.log("HIDE_NOTIFICATION")
          
        return {...initialState};
      case SHOW_NOTIFICATION:
          console.log("SHOW_NOTIFICATION");
        return {
            message:action.data,
            isVisible:true
        };
        
         
      default:
        return state;
      }
    }
    
    export default notification;