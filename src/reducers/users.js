
export const usersReducer= (state,action)=>{
    switch(action.type) {
        case "GET_USERS":
            state= {...state, users: action.payload} 
            return state 
        case "SENT_REQUESTS":
            state= {...state, recievers: action.payload}
            return state
        case "RECIEVED_REQUESTS":
            state= {...state, senders: action.payload}
            return state
        default: 
            throw new Error(`Invalid Action Type: ${action.type}`)
    }
}

