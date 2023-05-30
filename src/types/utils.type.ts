export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export type NoUndefinedField<T> = {
  // `-?` remove key undefiend
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
