import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './(auth)/login'
import Signup from './(auth)/signup'
import AuthLayout from './components/layout/authLayout'
import PublicLayout from './components/layout/publicLayout'
import Products from './pages/products'
import Reciepes from './pages/reciepes'
import ProductDetail from './pages/ProductDetail'
import RecipeDetail from './pages/RecipeDetail'

export default function Router() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/recipes",
          element: <Reciepes />,
        },
        {
          path: "/products/productsdetails/:id",
          element: <ProductDetail />
        },
        {
          path: "/products/RecipeDetails/:id",
          element: <RecipeDetail />
        }
      ],
    }

  ])
    
  return <RouterProvider router={router} />
}
