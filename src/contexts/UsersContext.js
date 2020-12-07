import React, { createContext, useReducer } from 'react'
import { usersReducer } from '../reducers/users'


export const UsersContext= createContext()

function UsersContextProvider({children}) {

    const [usersState,dispatch]= useReducer(usersReducer, {user:[], recievers: [], senders: []} )
  

    return (
        <UsersContext.Provider value={{ usersState, dispatch }}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersContextProvider
