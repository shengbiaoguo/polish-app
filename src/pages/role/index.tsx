import { Card, List, Typography } from 'antd'

const roles = ['超级管理员', '运营', '编辑', '访客']

const RolePage = () => {
  return (
    <Card>
      <Typography.Title level={4}>角色管理</Typography.Title>

      <List bordered dataSource={roles} renderItem={(item) => <List.Item>{item}</List.Item>} />
    </Card>
  )
}

export default RolePage
