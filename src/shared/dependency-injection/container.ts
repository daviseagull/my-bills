import { IAccountRepository } from '@/application/repositories/account.repository'
import { ICategoryRepository } from '@/application/repositories/category.repository'
import { IUserRepository } from '@/application/repositories/user.repository'
import { IAuthenticationService } from '@/application/services/authentication.service'
import { CreateDefaultCategoriesUseCase } from '@/application/use-cases/category/create-default-categories.use-case'
import { CreateUserUseCase } from '@/application/use-cases/user/create-user.use-case'
import { CognitoService } from '@/infra/authentication/service/cognito.service'
import { AccountPrismaRepository } from '@/infra/database/prisma/repositories/account.prisma-repository'
import { CategoryPrismaRepository } from '@/infra/database/prisma/repositories/category.prisma-repository'
import { UserPrismaRepository } from '@/infra/database/prisma/repositories/user.prisma-repository'
import { container } from 'tsyringe'

// Repositories

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserPrismaRepository
)

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryPrismaRepository
)

container.registerSingleton<IAccountRepository>(
  'AccountRepository',
  AccountPrismaRepository
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
