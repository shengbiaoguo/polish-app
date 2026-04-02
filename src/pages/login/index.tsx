import { Button, Card, Form, Input, Typography, message } from 'antd'
import type { FormProps } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/store'
import type { LoginParams } from '@/types/auth'
import { UserRole } from '@/constants/permission'

const LoginPage = () => {
  const navigate = useNavigate()
  const { setLogin } = useAuthStore()

  const onFinish: FormProps<LoginParams>['onFinish'] = async (values) => {
    try {
      const roleMap: Record<string, UserRole> = {
        super: UserRole.SUPER_ADMIN,
        admin: UserRole.ADMIN,
        operator: UserRole.OPERATOR,
        viewer: UserRole.VIEWER,
      }

      const currentRole = roleMap[values.username] ?? UserRole.VIEWER

      const mockResponse = {
        token: 'mock_admin_token',
        userInfo: {
          id: '1',
          username: values.username,
          nickname: '系统管理员',
          role: currentRole,
        },
      }

      setLogin(mockResponse)
      message.success('登录成功')
      navigate('/dashboard', { replace: true })
    } catch {
      message.error('登录失败')
    }
  }

  return (
    <div className="login-page">
      <Card className="login-card" bordered={false}>
        <div className="login-card__header">
          <Typography.Title level={3}>后台管理系统</Typography.Title>
          <Typography.Paragraph type="secondary">
            企业级 React Admin 基础脚手架
          </Typography.Paragraph>
        </div>

        <Form<LoginParams> layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large">
            登录
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default LoginPage
