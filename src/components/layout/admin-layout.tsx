import { Breadcrumb, Layout } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'

import { AdminHeader } from './admin-header'
import { AdminSider } from './admin-sider'
import { adminRouteConfigs } from '@/app/router/route-config'

const { Content } = Layout

export const AdminLayout = () => {
  const location = useLocation()

  const currentRoute = adminRouteConfigs.find((route) => route.path === location.pathname)

  const breadcrumbItems = [{ title: '首页' }, { title: currentRoute?.meta.title ?? '页面' }]

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
