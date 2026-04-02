import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AdminLayout } from '@/components/layout/admin-layout'
import { AuthGuard } from './guard'
import { adminRouteConfigs } from './route-config'

const LoginPage = lazy(() => import('@/pages/login'))
const NotFoundPage = lazy(() => import('@/pages/exception/404'))

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <AuthGuard>
        <LoginPage />
      </AuthGuard>
    ),
  },
  {
    path: '/',
    element: (
      <AuthGuard requiresAuth>
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      ...adminRouteConfigs.map((route) => ({
        path: route.path.replace(/^\//, ''),
        element: (
          <AuthGuard requiresAuth={route.meta.requiresAuth} roles={route.meta.roles}>
            {route.element}
          </AuthGuard>
        ),
      })),
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
