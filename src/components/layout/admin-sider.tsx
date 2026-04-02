import { DesktopOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppStore } from '@/store'

const { Sider } = Layout

const menuItems = [
  {
    key: '/dashboard',
    icon: <DesktopOutlined />,
    label: '仪表盘',
  },
  {
    key: '/user',
    icon: <UserOutlined />,
    label: '用户管理',
  },
  {
    key: '/role',
    icon: <TeamOutlined />,
    label: '角色管理',
  },
]

export const AdminSider = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { siderCollapsed } = useAppStore()

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
