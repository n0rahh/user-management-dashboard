export const ButtonTypes = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
} as const

export type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes]
