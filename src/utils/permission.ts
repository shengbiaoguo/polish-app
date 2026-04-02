import type { AppRouteConfig } from '@/types/route'
import type { UserRole } from '@/constants/permission'

export const hasRoutePermission = (userRole: UserRole | undefined, route: AppRouteConfig) => {
  const roles = route.meta.roles

  if (!roles || roles.length === 0) {
    return true
  }

  if (!userRole) {
    return false
  }

  return roles.includes(userRole)
}

export const filterRoutesByRole = (
  routes: AppRouteConfig[],
  userRole: UserRole | undefined,
): AppRouteConfig[] => {
  return routes
    .filter((route) => hasRoutePermission(userRole, route))
    .map((route) => ({
      ...route,
      children: route.children ? filterRoutesByRole(route.children, userRole) : undefined,
    }))
}
