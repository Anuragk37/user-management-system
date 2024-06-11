import { useState } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import UserHome from './Pages/User/UserHome'
import Login from './Pages/User/Login'
import SignUp from './Pages/User/SignUp'
import { UserPrivateRoute } from './utils/UserPrivertRoute'
import { AdminPrivateRoute } from './utils/AdminPrivetRout.js'
import { AdminReverseRoute } from './utils/AdminReverseRoute.js'
import { UserReverseRoute } from './utils/UserReverseRoute.js'
import { store,persistor } from './app/store.js'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import UserProfile from './Pages/User/UserProfile.jsx'
import AdminLogin from './Pages/Admin/AdminLogin.jsx'
import AdminHome from './Pages/Admin/AdminHome.jsx'
import UserList from './Pages/Admin/UserList.jsx'
import EditUser from './Pages/Admin/EditUser.jsx'
import EditProfile from './Pages/User/EditProfile.jsx'
function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/user-home',
      element:<UserPrivateRoute><UserHome /></UserPrivateRoute>
    },
    {
      path:'/signin',
      element: <UserReverseRoute><Login fromAdmin={false}/></UserReverseRoute>
    },
    {
      path:'/signup',
      element: <UserReverseRoute><SignUp fromAdmin={false}/></UserReverseRoute>
    },
    {
      path:'/user-profile',
      element:<UserPrivateRoute><UserProfile/></UserPrivateRoute>
    },
    {
      path:'/edit-profile',
      element:<UserPrivateRoute><EditProfile/></UserPrivateRoute>
    },
    {
      path:'/admin-login',
      element:<AdminReverseRoute><Login fromAdmin={true}/></AdminReverseRoute>
    },
    {
      path:'/admin-home',
      element:<AdminPrivateRoute><AdminHome /></AdminPrivateRoute>
    },
    {
      path:'/userlist',
      element:<AdminPrivateRoute><UserList /></AdminPrivateRoute>
    },
    {
      path:'/edit-user/:id',
      element:<AdminPrivateRoute><EditUser /></AdminPrivateRoute>
    },
    {
      path:'/create-user',
      element:<AdminPrivateRoute><SignUp fromAdmin={true} /></AdminPrivateRoute>
    },
  ])


  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
      
    </>
  )
}

export default App
