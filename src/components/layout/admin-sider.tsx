import { Layout, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppStore, useAuthStore } from '@/store'
import { adminRouteConfigs } from '@/app/router/route-config'
import { filterRoutesByRole } from '@/utils/permission'

const { Sider } = Layout

export const AdminSider = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { siderCollapsed } = useAppStore()
  const userRole = useAuthStore((state) => state.userInfo?.role)

  const menuRoutes = filterRoutesByRole(adminRouteConfigs, userRole).filter(
    (route) => !route.meta.hideInMenu,
  )

  const menuItems = menuRoutes.map((route) => ({
    key: route.path,
    icon: route.meta.icon,
    label: route.meta.title,
  }))

  return (
    <Sider trigger={null} collapsible collapsed={siderCollapsed} width={220}>
      <div className="admin-logo">Admin System</div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  )
}
