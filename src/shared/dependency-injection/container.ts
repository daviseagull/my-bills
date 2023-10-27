import { IUserCategoriesRepository } from '@/application/repositories/user-categories.repository'
import { IUserRepository } from '@/application/repositories/user.repository'
import { IAuthenticationService } from '@/application/services/authentication.service'
import { CreateDefaultCategoriesUseCase } from '@/application/use-cases/category/create-default-categories.use-case'
import { CreateUserUseCase } from '@/application/use-cases/user/create-user.use-case'
import { CognitoService } from '@/infra/authentication/service/cognito.service'
import { UserCategoriesPrismaRepository } from '@/infra/database/prisma/repositories/user-categories.prisma-repository'
import { UserPrismaRepository } from '@/infra/database/prisma/repositories/user.prisma-repository'
import { container } from 'tsyringe'

// Repositories

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserPrismaRepository
)

container.registerSingleton<IUserCategoriesRepository>(
  'UserCategoriesRepository',
  UserCategoriesPrismaRepository
)

// Services

container.registerSingleton<IAuthenticationService>(
  'AuthService',
  CognitoService
)

// Use-cases

container.register<CreateDefaultCategoriesUseCase>(
  'CreateDefaultCategoriesUseCase',
  CreateDefaultCategoriesUseCase
)

container.register<CreateUserUseCase>('CreateUserUseCase', CreateUserUseCase)
