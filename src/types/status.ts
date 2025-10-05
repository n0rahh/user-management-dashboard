export const StatusTypes = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const

export type StatusType = (typeof StatusTypes)[keyof typeof StatusTypes]
