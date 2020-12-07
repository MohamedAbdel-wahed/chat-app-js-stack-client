import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext'
import UsersContextProvider from './contexts/UsersContext'
import MessagesContextProvider from './contexts/MessagesContext'
import ApolloServiceProvider from './ApolloServiceProvider'
import ProtectedRoute from './utils/protectedRoute'
import Navbar from './components/Navbar'
import Home from './views/Home'
import Requests from './views/Requests'
import Explore from './views/Explore'
import Edit from './views/Edit'
import Register from './views/auth/Register'
import Login from './views/auth/Login'



function App() {
  return (
    <AuthContextProvider>
      <UsersContextProvider>
        <MessagesContextProvider>
          <ApolloServiceProvider>
            <BrowserRouter>
              <div id="app" className="h-screen overflow-hidden font-nunito bg-white">
                  <Navbar />
                <div id="app_content">
                  <ProtectedRoute exact path="/" component={Home} loggedIn />
                  <ProtectedRoute path="/requests" component={Requests} loggedIn />
                  <ProtectedRoute path="/explore" component={Explore} loggedIn />
                  <ProtectedRoute path="/edit" component={Edit} loggedIn />
                <div className="w-full flex justify-center">
                    <ProtectedRoute path="/register" component={Register} guest />
                    <ProtectedRoute path="/login" component={Login} guest />
                </div>
                </div>
              </div>
            </BrowserRouter> 
          </ApolloServiceProvider>
        </MessagesContextProvider>
      </UsersContextProvider>
    </AuthContextProvider>
  )
}

export default App
