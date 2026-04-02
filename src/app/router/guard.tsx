import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { isLoggedIn } from '@/utils/auth'

interface AuthGuardProps extends PropsWithChildren {
  requiresAuth?: boolean
}

export const AuthGuard = ({ children, requiresAuth = false }: AuthGuardProps) => {
  const location = useLocation()
  const loggedIn = isLoggedIn()

  if (requiresAuth && !loggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (loggedIn && location.pathname === '/login') {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
