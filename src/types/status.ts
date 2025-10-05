export const StatusTypes = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  UNKNOWN: 'unknown',
} as const

export type StatusType = (typeof StatusTypes)[keyof typeof StatusTypes]
