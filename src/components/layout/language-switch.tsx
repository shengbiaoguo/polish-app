import { GlobalOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import type { MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'

const LanguageSwitch = () => {
  const { i18n, t } = useTranslation()

  const items: MenuProps['items'] = [
    {
      key: 'zh-CN',
      label: t('chinese'),
    },
    {
      key: 'en-US',
      label: t('english'),
    },
  ]

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    void i18n.changeLanguage(key)
  }

  return (
    <Dropdown menu={{ items, onClick: handleClick }}>
      <Space style={{ cursor: 'pointer' }}>
        <GlobalOutlined />
        {i18n.language === 'en-US' ? t('english') : t('chinese')}
      </Space>
    </Dropdown>
  )
}

export default LanguageSwitch
