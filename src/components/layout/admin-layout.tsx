import { Breadcrumb, Layout } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'

import { adminRouteConfigs } from '@/app/router/route-config'
import type { AppRouteConfig } from '@/types/route'
import { AdminHeader } from './admin-header'
import { AdminSider } from './admin-sider'

const { Content } = Layout

const findBreadcrumbs = (
  routes: AppRouteConfig[],
  pathname: string,
  parents: { title: string }[] = [],
): { title: string }[] => {
  for (const route of routes) {
    const current = [...parents, { title: route.meta.title }]

    if (route.path === pathname) {
      return current
    }

    if (route.children?.length) {
      const result = findBreadcrumbs(route.children, pathname, current)
      if (result.length) {
        return result
      }
    }
  }

  return []
}

export const AdminLayout = () => {
  const location = useLocation()

  const routeBreadcrumbs = findBreadcrumbs(adminRouteConfigs, location.pathname)

  const breadcrumbItems = [{ title: '首页' }, ...routeBreadcrumbs]

  return (
    <Layout className="admin-layout">
      <AdminSider />

      <Layout>
        <AdminHeader />

        <Content className="admin-content">
          <Breadcrumb items={breadcrumbItems} />

          <div className="admin-content__inner">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
