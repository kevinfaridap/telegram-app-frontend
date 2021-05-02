import {combineReducers} from 'redux'
import userReducer from './user'


const rootReducer = combineReducers({
    users: userReducer,
    
})


export default rootReducer