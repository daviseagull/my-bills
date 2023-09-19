import { User } from '@/types/express/User'

export {}

declare global {
  namespace Express {
    export interface Request {
      user?: User
    }
  }
}
