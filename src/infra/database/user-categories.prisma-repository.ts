import { IUserCategoriesRepository } from '@/application/repositories/user-categories.repository'
import { UserCategories } from '@/domain/entities/user-categories.entity'
import { PrismaClient } from '@prisma/client'
import { CategoryPrismaMapper } from './prisma/mappers/category.prisma-mapper'
import { UserCategoriesPrismaUtils } from './prisma/utils/user-categories.prisma-utils'

export class UserCategoriesPrismaRepository
  implements IUserCategoriesRepository
{
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async create(category: UserCategories): Promise<UserCategories> {
    const createdCategory = await this.prisma.userCategories.create({
      data: {
        cognitoUser: category.props.user,
        incomes: UserCategoriesPrismaUtils.toPrismaCategories(
          category.props.incomes
        ),
        expenses: UserCategoriesPrismaUtils.toPrismaCategories(
          category.props.expenses
        )
      }
    })
    return CategoryPrismaMapper.toDomain(createdCategory)
  }

  async findByUser(userCognitoId: string): Promise<UserCategories | null> {
    const category = await this.prisma.userCategories.findUnique({
      where: {
        cognitoUser: userCognitoId
      }
    })

    if (!category) {
      return null
    }

    return CategoryPrismaMapper.toDomain(category!)
  }

  async findById(id: string): Promise<UserCategories | null> {
    const category = await this.prisma.userCategories.findUnique({
      where: {
        id: id
      }
    })

    if (!category) {
      return null
    }

    return CategoryPrismaMapper.toDomain(category!)
  }
}
