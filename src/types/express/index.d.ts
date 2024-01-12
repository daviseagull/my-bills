export {}

declare global {
  namespace Express {
    export type Request = {
      user?: string | undefined
      token?: string | undefined
    }
  }
}
