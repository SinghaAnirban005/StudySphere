import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux"
import store from "./store/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// const router = createBrowserRouter(
//   [
//     {
//       path: '/',
//       element: <App />,
//       children: [
//         {
//           path: 
//           element: 
//         }
//       ]
//     }
//   ]
// )


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
