import { Card, Col, Row, Statistic, Typography } from 'antd'

const DashboardPage = () => {
  return (
    <div>
      <Typography.Title level={4}>仪表盘</Typography.Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="用户总数" value={1280} />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Statistic title="角色总数" value={16} />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Statistic title="今日新增" value={23} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardPage
