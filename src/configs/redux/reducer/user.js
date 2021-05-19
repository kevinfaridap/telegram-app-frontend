const initialState = {
    users: [],
    loading: false,
    error: ''
}

const userReducer = (state = initialState, action) =>{
  switch(action.type) {
    case 'USER_UPDATE' :
      return{
        ...state,
        users: action.payload
      }
      case 'GET_PROFILE' :
      return{
        ...state,
        users: action.payload
      }
    default:
      return state;
  }
}


export default userReducer