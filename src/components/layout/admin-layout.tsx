import { Breadcrumb, Layout } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'

import { AdminHeader } from './admin-header'
import { AdminSider } from './admin-sider'

const { Content } = Layout

const breadcrumbNameMap: Record<string, string> = {
  '/dashboard': '仪表盘',
  '/user': '用户管理',
  '/role': '角色管理',
}

export const AdminLayout = () => {
  const location = useLocation()

  const breadcrumbItems = [
    { title: '首页' },
    { title: breadcrumbNameMap[location.pathname] ?? '页面' },
  ]

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
