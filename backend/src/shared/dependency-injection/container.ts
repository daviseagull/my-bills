import { AuthenticationService } from '@/application/authentication/authentication.service'
import { CategoryRepository } from '@/application/repositories/category.repository'
import { UserRepository } from '@/application/repositories/user.repository'
import { CreateDefaultCategoryUseCase } from '@/application/use-cases/category/create-default-categories/create-default-categories.use-case'
import { CreateUserUseCase } from '@/application/use-cases/user/create-user/create-user.use-case'
import { CognitoService } from '@/infra/authentication/service/cognito.service'
import { CategoryPrismaRepository } from '@/infra/database/category.prisma-repository'
import { UserPrismaRepository } from '@/infra/database/user.prisma-repository'
import { container } from 'tsyringe'

// Repositories

container.registerSingleton<UserRepository>(
  'UserRepository',
  UserPrismaRepository
)

container.registerSingleton<CategoryRepository>(
  'CategoryRepository',
  CategoryPrismaRepository
)

// Services

container.registerSingleton<AuthenticationService>(
  'AuthService',
  CognitoService
)

// Use-cases

container.register<CreateDefaultCategoryUseCase>(
  'CreateDefaultCategoryUseCase',
  CreateDefaultCategoryUseCase
)

container.register<CreateUserUseCase>('CreateUserUseCase', CreateUserUseCase)
