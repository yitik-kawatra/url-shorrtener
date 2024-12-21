import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layouts/app-layout"
import LandingPage from "./pages/landing"
import Auth from "./pages/auth"
import Link from "./pages/link"
import RedirectLink from "./pages/redirect-link"
import Dashboard from "./pages/dashboard"
import UrlProvider from "./context"
import RequireAuth from "./components/require-auth"
function App() {

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:'/dashboard',
        element: <RequireAuth><Dashboard /></RequireAuth>
        
      },
      {
        path:'/auth',
        element: <Auth/>
      },
      {
        path: '/link/:id',
        element: <RequireAuth><Link/></RequireAuth>
      },
      {
        path: '/:id',
        element: <RedirectLink />
      }
    ]

  }
])
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  )
}

export default App
