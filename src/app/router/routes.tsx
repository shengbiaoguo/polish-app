import { lazy } from 'react'
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'

import { AdminLayout } from '@/components/layout/admin-layout'
import { AuthGuard } from './guard'
import { adminRouteConfigs } from './route-config'
import type { AppRouteConfig } from '@/types/route'

const LoginPage = lazy(() => import('@/pages/login'))
const NotFoundPage = lazy(() => import('@/pages/exception/404'))

const getRelativePath = (parentPath: string, childPath: string) => {
  if (!childPath.startsWith(parentPath)) {
    return childPath.replace(/^\//, '')
  }

  return childPath.slice(parentPath.length).replace(/^\//, '')
}

const buildRouteObjects = (routes: AppRouteConfig[], parentPath = ''): RouteObject[] => {
  return routes.map((route) => {
    const currentPath = parentPath
      ? getRelativePath(parentPath, route.path)
      : route.path.replace(/^\//, '')

    const routeObject: RouteObject = {
      path: currentPath,
      element: (
        <AuthGuard requiresAuth={route.meta.requiresAuth} roles={route.meta.roles}>
          {route.element}
        </AuthGuard>
      ),
    }

    if (route.children?.length) {
      routeObject.children = buildRouteObjects(route.children, route.path)
    }

    return routeObject
  })
}

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
      ...buildRouteObjects(adminRouteConfigs),
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
