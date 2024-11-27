export enum Role {
  STUDENT = 'STUDENT',
  FACULTY = 'FACULTY',
  DEPARTMENT_HEAD = 'DEPARTMENT_HEAD',
  DIRECTOR = 'DIRECTOR',
}

export const roleHierarchy: Record<Role, Role[]> = {
  [Role.STUDENT]: [],
  [Role.FACULTY]: [Role.STUDENT],
  [Role.DEPARTMENT_HEAD]: [Role.FACULTY, Role.STUDENT],
  [Role.DIRECTOR]: [Role.DEPARTMENT_HEAD, Role.FACULTY, Role.STUDENT],
}

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  return userRole === requiredRole || roleHierarchy[userRole].includes(requiredRole)
}

