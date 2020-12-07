
export const setMessages= (messages)=>{
    return {
        type: "GET_MESSAGES",
        payload: messages
    }
}


export const getFriends= (friends)=>{
    return {
        type: "GET_FRIENDS",
        payload: friends
    }
}


export const addMessage= (newMsg)=>{
    return {
        type: "ADD_MESSAGE",
        payload: newMsg
    }
}


export const getSelectedUser= (selectedUser)=>{
    return {
        type: "GET_SELECTED_USER",
        payload: selectedUser
    }
}
