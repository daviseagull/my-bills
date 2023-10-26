import { ICategoryRepository } from '@/application/repositories/category.repository'
import { IUserRepository } from '@/application/repositories/user.repository'
import { IAuthenticationService } from '@/application/services/authentication.service'
import { CreateDefaultCategoryUseCase } from '@/application/use-cases/category/create-default-categories.use-case'
import { CreateUserUseCase } from '@/application/use-cases/user/create-user.use-case'
import { CognitoService } from '@/infra/authentication/service/cognito.service'
import { CategoryPrismaRepository } from '@/infra/database/category.prisma-repository'
import { UserPrismaRepository } from '@/infra/database/user.prisma-repository'
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

// Services

container.registerSingleton<IAuthenticationService>(
  'AuthService',
  CognitoService
)

// Use-cases

container.register<CreateDefaultCategoryUseCase>(
  'CreateDefaultCategoryUseCase',
  CreateDefaultCategoryUseCase
)

container.register<CreateUserUseCase>('CreateUserUseCase', CreateUserUseCase)
