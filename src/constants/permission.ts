export const UserRole = {
  SUPER_ADMIN: 1,
  ADMIN: 2,
  OPERATOR: 3,
  VIEWER: 4,
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]
