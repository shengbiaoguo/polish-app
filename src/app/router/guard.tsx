import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { isLoggedIn } from '@/utils/auth'
import { useAuthStore } from '@/store'
import type { UserRole } from '@/constants/permission'

interface AuthGuardProps extends PropsWithChildren {
  requiresAuth?: boolean
  roles?: UserRole[]
}

export const AuthGuard = ({ children, requiresAuth = false, roles }: AuthGuardProps) => {
  const location = useLocation()
  const loggedIn = isLoggedIn()
  const userRole = useAuthStore((state) => state.userInfo?.role)

  if (requiresAuth && !loggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (loggedIn && location.pathname === '/login') {
    return <Navigate to="/dashboard" replace />
  }

  if (requiresAuth && roles && roles.length > 0) {
    if (!userRole || !roles.includes(userRole)) {
      return <Navigate to="/403" replace />
    }
  }

  return <>{children}</>
}
