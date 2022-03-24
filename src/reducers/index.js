import {isLogged} from './auth/isLogged'
import {user} from './auth/user'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    isLogged, user
})

export default allReducers;