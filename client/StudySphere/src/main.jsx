import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux"
import store from "./store/store.js"
import Home from './components/Home.jsx'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import MyGroups from './components/MyGroups.jsx'
import JoinG from './components/JoinG.jsx'
import Group from './components/Group.jsx'
import Access from './components/Access.jsx'
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
        },
        {
          path: '/group',
          element: <MyGroups />
        },
        {
          path: '/joinGroups',
          element: <JoinG />
        },
        {
          path: '/c/:groupId',
          element: <Group />
        },
        {
          path: 'joinGroups/join/:groupId',
          element: <Access />
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
