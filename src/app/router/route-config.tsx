import {
  AppstoreOutlined,
  DesktopOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { lazy } from 'react'

import { Outlet } from 'react-router-dom'
import type { AppRouteConfig } from '@/types/route'
import { UserRole } from '@/constants/permission'

const DashboardPage = lazy(() => import('@/pages/dashboard'))
const UserPage = lazy(() => import('@/pages/user'))
const UserDetailPage = lazy(() => import('@/pages/user/detail'))
const RolePage = lazy(() => import('@/pages/system/role'))
const MenuManagePage = lazy(() => import('@/pages/system/menu'))
const ForbiddenPage = lazy(() => import('@/pages/exception/403'))

export const adminRouteConfigs: AppRouteConfig[] = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
    meta: {
      titleKey: 'systemManagement',
      requiresAuth: true,
      icon: <DesktopOutlined />,
      roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.OPERATOR, UserRole.VIEWER],
    },
  },
  {
    path: '/user',
    element: <UserPage />,
    meta: {
      titleKey: 'dashboard',
      requiresAuth: true,
      icon: <UserOutlined />,
      roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
    },
    children: [
      {
        path: '/user/detail',
        element: <UserDetailPage />,
        meta: {
          titleKey: '用户详情',
          requiresAuth: true,
          hideInMenu: true,
          roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
        },
      },
    ],
  },
  {
    path: '/system',
    element: <Outlet />,
    meta: {
      titleKey: 'systemManagement',
      requiresAuth: true,
      icon: <SettingOutlined />,
      roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
    },
    children: [
      {
        path: '/system/role',
        element: <RolePage />,
        meta: {
          titleKey: 'roleManagement',
          requiresAuth: true,
          icon: <TeamOutlined />,
          roles: [UserRole.SUPER_ADMIN],
        },
      },
      {
        path: '/system/menu',
        element: <MenuManagePage />,
        meta: {
          titleKey: 'roleManagement',
          requiresAuth: true,
          icon: <AppstoreOutlined />,
          roles: [UserRole.SUPER_ADMIN],
        },
      },
    ],
  },
  {
    path: '/403',
    element: <ForbiddenPage />,
    meta: {
      titleKey: '无权限',
      hideInMenu: true,
    },
  },
]
