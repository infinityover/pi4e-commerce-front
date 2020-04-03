import { createStore } from 'redux'

function login(state={}, action){

    switch(action.type){
        case 'LOGIN':
            return {user:action.nome,type:action.userType,auth:action.token}
        case 'LOGOUT':
            return {}
        default:
            return {}
    }
}

const user = createStore(login)

export default user;