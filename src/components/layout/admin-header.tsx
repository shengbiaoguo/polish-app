import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Layout, Space, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitch from './language-switch'

import { useAppStore, useAuthStore } from '@/store'

const { Header } = Layout

export const AdminHeader = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { siderCollapsed, toggleSider } = useAppStore()
  const { userInfo, logout } = useAuthStore()

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('common.logout'),
    },
  ]

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      logout()
      navigate('/login', { replace: true })
    }
  }

  return (
    <Header className="admin-header">
      <div className="admin-header__left">
        {siderCollapsed ? (
          <MenuUnfoldOutlined className="admin-header__trigger" onClick={toggleSider} />
        ) : (
          <MenuFoldOutlined className="admin-header__trigger" onClick={toggleSider} />
        )}
      </div>

      <div className="admin-header__right">
        <Space size={16}>
          <LanguageSwitch />

          <Dropdown menu={{ items, onClick: handleMenuClick }}>
            <Space className="admin-header__user">
              <Avatar size="small">{userInfo?.nickname?.[0] ?? 'A'}</Avatar>
              <Typography.Text>{userInfo?.nickname ?? 'Admin'}</Typography.Text>
            </Space>
          </Dropdown>
        </Space>
      </div>
    </Header>
  )
}
