import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AdminLayout } from '@/components/layout/admin-layout'
import { AuthGuard } from './guard'

const LoginPage = lazy(() => import('@/pages/login'))
const DashboardPage = lazy(() => import('@/pages/dashboard'))
const UserPage = lazy(() => import('@/pages/user'))
const RolePage = lazy(() => import('@/pages/role'))
const ForbiddenPage = lazy(() => import('@/pages/exception/403'))
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
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'user',
        element: <UserPage />,
      },
      {
        path: 'role',
        element: <RolePage />,
      },
      {
        path: '403',
        element: <ForbiddenPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
