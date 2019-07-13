import { HANDLE_LOGIN,SAVE_SEARCH_PLANNET,SAVE_PLANNET_DETAILS } from "../constants/action-types";
const initialState = {
  login_data: {
      username:'',
      isUserLoggedIn:false
  },
  plannet_data:{
      loader:false,
      count: 0, 
      plannet_arr:[],
      errorMessage:''
  },
  plannet_details:{
    loader:false,
    detail:{},
    errorMessage:''
}
};
function rootReducer(state = initialState, action) {
  let newState = '';
  if (action.type === HANDLE_LOGIN) {
    newState = Object.assign({},state,{login_data: action.payload});
    return newState;  
  }
  else if(action.type === SAVE_SEARCH_PLANNET){
    newState = Object.assign({},state,{plannet_data: action.payload});
    return newState; 
  }
  else if(action.type === SAVE_PLANNET_DETAILS){
    newState = Object.assign({},state,{plannet_details: action.payload});
    return newState; 
  }
  return state;
}
export default rootReducer;