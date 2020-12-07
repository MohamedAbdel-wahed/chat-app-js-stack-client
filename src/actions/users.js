
export const getUsers= (users)=> {
    return {
        type: "GET_USERS",
        payload: users
    }
}


export const getRecievers= (recievers)=> {
    return {
        type: "SENT_REQUESTS",
        payload: recievers
    }
}


export const getSenders= (senders)=> {
    return {
        type: "RECIEVED_REQUESTS",
        payload: senders
    }
}