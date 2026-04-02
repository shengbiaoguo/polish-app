import { DesktopOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { lazy } from 'react'

import type { AppRouteConfig } from '@/types/route'
import { UserRole } from '@/constants/permission'

const DashboardPage = lazy(() => import('@/pages/dashboard'))
const UserPage = lazy(() => import('@/pages/user'))
const RolePage = lazy(() => import('@/pages/role'))
const ForbiddenPage = lazy(() => import('@/pages/exception/403'))

export const adminRouteConfigs: AppRouteConfig[] = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
    meta: {
      title: '仪表盘',
      requiresAuth: true,
      icon: <DesktopOutlined />,
      roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.OPERATOR, UserRole.VIEWER],
    },
  },
  {
    path: '/user',
    element: <UserPage />,
    meta: {
      title: '用户管理',
      requiresAuth: true,
      icon: <UserOutlined />,
      roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
    },
  },
  {
    path: '/role',
    element: <RolePage />,
    meta: {
      title: '角色管理',
      requiresAuth: true,
      icon: <TeamOutlined />,
      roles: [UserRole.SUPER_ADMIN],
    },
  },
  {
    path: '/403',
    element: <ForbiddenPage />,
    meta: {
      title: '无权限',
      requiresAuth: false,
      hideInMenu: true,
    },
  },
]
