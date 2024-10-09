import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux"
import store from "./store/store.js"
import Home from './components/Home.jsx'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/signUp',
          element: <SignUp />
        },
        {
          path: '/login',
          element: <Login />
        }
      ]
    }
  ]
)


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
