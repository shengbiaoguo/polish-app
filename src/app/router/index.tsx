import { Suspense } from 'react'
import { Spin } from 'antd'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

export const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <Spin size="large" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  )
}
