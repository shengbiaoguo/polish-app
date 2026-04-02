import { useMemo, useState } from 'react'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { adminRouteConfigs } from '@/app/router/route-config'
import { useAppStore, useAuthStore } from '@/store'
import type { AppRouteConfig } from '@/types/route'
import { filterRoutesByRole } from '@/utils/permission'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

const getVisibleChildren = (routes?: AppRouteConfig[]): AppRouteConfig[] => {
  if (!routes?.length) return []

  return routes
    .filter((route) => !route.meta.hideInMenu)
    .map((route) => ({
      ...route,
      children: getVisibleChildren(route.children),
    }))
}

const getMenuItems = (routes: AppRouteConfig[], t: (key: string) => string): MenuItem[] => {
  return routes
    .filter((route) => !route.meta.hideInMenu)
    .map((route) => {
      const visibleChildren = getVisibleChildren(route.children)

      if (visibleChildren.length > 0) {
        return {
          key: route.path,
          icon: route.meta.icon,
          label: t(route.meta.titleKey),
          children: getMenuItems(visibleChildren, t),
        }
      }

      return {
        key: route.path,
        icon: route.meta.icon,
        label: t(route.meta.titleKey),
      }
    })
}

const findMatchedKeys = (
  routes: AppRouteConfig[],
  pathname: string,
  parents: string[] = [],
): { selectedKey?: string; openKeys: string[] } => {
  for (const route of routes) {
    const currentParents = [...parents]

    if (route.children?.length) {
      const childMatched = findMatchedKeys(route.children, pathname, [
        ...currentParents,
        route.path,
      ])

      if (childMatched.selectedKey) {
        return childMatched
      }
    }

    if (route.path === pathname) {
      return {
        selectedKey: route.path,
        openKeys: currentParents,
      }
    }
  }

  return {
    selectedKey: undefined,
    openKeys: [],
  }
}

export const AdminSider = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { siderCollapsed } = useAppStore()
  const userRole = useAuthStore((state) => state.userInfo?.role)

  const menuRoutes = useMemo(() => {
    return filterRoutesByRole(adminRouteConfigs, userRole)
  }, [userRole])

  const menuItems = useMemo(() => getMenuItems(menuRoutes, t), [menuRoutes, t])

  const matched = useMemo(() => {
    return findMatchedKeys(menuRoutes, location.pathname)
  }, [menuRoutes, location.pathname])

  const [openKeys, setOpenKeys] = useState<string[]>(() => matched.openKeys)

  return (
    <Sider trigger={null} collapsible collapsed={siderCollapsed} width={220}>
      <div className="admin-logo">Admin System</div>

      <Menu
        theme="dark"
        mode="inline"
        items={menuItems}
        selectedKeys={matched.selectedKey ? [matched.selectedKey] : []}
        openKeys={siderCollapsed ? [] : openKeys}
        onOpenChange={(keys) => {
          setOpenKeys(keys as string[])
        }}
        onClick={({ key }) => {
          navigate(key)
        }}
      />
    </Sider>
  )
}
