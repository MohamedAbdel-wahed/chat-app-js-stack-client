export const messagesReducer= (state,action)=> {
    switch (action.type) {
        case "GET_MESSAGES":
            state= {...state, messages: action.payload}
            return state
        case "GET_FRIENDS":
            state= {...state, friends: action.payload}
            return state
        case "ADD_MESSAGE":
            let friendIndex= state.friends.findIndex(friend=> friend.username===action.payload.to || friend.username===action.payload.from)
            state.friends[friendIndex].latestMsg= action.payload

            const friends= [...state.friends, state.friends[friendIndex]]
            const messages= state.messages ? [...state.messages, action.payload] : null

            state= { ...state, messages, friends} 
            return state
        case "GET_SELECTED_USER":
            state= { ...state, selectedUser: action.payload} 
            return state
        default:
            throw new Error(`Invalid Action Type: ${action.type}`)
    }
}
