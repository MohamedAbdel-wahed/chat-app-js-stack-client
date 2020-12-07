import React,{createContext,useReducer} from 'react'
import { messagesReducer } from '../reducers/messages'


export const MessagesContext= createContext()

function MessagesContextProvider({children}) {

    const [msgState, msgDispatch] = useReducer(messagesReducer, {})

    return (
        <MessagesContext.Provider value={{ msgState, msgDispatch }}>
            { children }
        </MessagesContext.Provider>
    )
}

export default MessagesContextProvider
