import { useMemo, useState } from 'react'
import { Button, Card, Input, Space, Table, Tag, Typography } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'

import { useUserList } from '@/hooks/use-user-list'
import type { UserItem } from '@/types/user'

const UserPage = () => {
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [keyword, setKeyword] = useState('')

  const queryParams = useMemo(
    () => ({
      pageNum,
      pageSize,
      keyword: keyword.trim() || undefined,
    }),
    [pageNum, pageSize, keyword],
  )

  const { data, isPending } = useUserList(queryParams)

  const columns: ColumnsType<UserItem> = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (value: UserItem['status']) =>
        value === 'enabled' ? <Tag color="success">启用</Tag> : <Tag>禁用</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link">编辑</Button>
          <Button type="link" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPageNum(pagination.current || 1)
    setPageSize(pagination.pageSize || 10)
  }

  return (
    <Card>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>
            用户管理
          </Typography.Title>

          <Space>
            <Input.Search
              allowClear
              placeholder="请输入用户名/昵称"
              style={{ width: 260 }}
              onSearch={(value) => {
                setPageNum(1)
                setKeyword(value)
              }}
            />
            <Button type="primary">新增用户</Button>
          </Space>
        </div>

        <Table<UserItem>
          rowKey="id"
          loading={isPending}
          columns={columns}
          dataSource={data?.list ?? []}
          pagination={{
            current: data?.pageNum ?? pageNum,
            pageSize: data?.pageSize ?? pageSize,
            total: data?.total ?? 0,
            showSizeChanger: true,
          }}
          onChange={handleTableChange}
        />
      </Space>
    </Card>
  )
}

export default UserPage
