/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import { useContext, lazy, Suspense } from 'react'
import { AppContext } from './contexts/app.context'
import path from './constants/path'
import CartPlayout from './layouts/CartPlayout'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))
const ProductList = lazy(() => import('./pages/ProductList'))
const UserLayout = lazy(() => import('./pages/User/layouts/UserLayout'))
const ChangePassWord = lazy(() => import('./pages/User/pages/ChangePassWord'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartPlayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartPlayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <Suspense>
                <UserLayout />
              </Suspense>
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassWord />
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: (
        <MainLayout>
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      ),
      index: true
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return routeElements
}
