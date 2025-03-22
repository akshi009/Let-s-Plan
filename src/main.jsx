import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Authentication from './components/Authentication.jsx'
import Home from './components/Home.jsx'
import Login from './components/login.jsx'
import Signup from './components/signup.jsx'
import './index.css'
import store from './store/store.js'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children: [{
      path:'/',
      element:<Home/>
    },{
      path:'/login',
      element:(
        <Authentication authentication={false}>
          <Login/>
          </Authentication>
      )
    },
    {
      path:'/signup',
      element:(
        <Authentication authentication={false}>
          <Signup/>
          </Authentication>
      )
    },
   
   
  ]
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
   <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  // </StrictMode>,
)
