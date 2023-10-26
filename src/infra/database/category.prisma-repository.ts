import { ICategoryRepository } from '@/application/repositories/category.repository'
import { Category } from '@/domain/entities/category.entity'
import { PrismaClient } from '@prisma/client'
import { CategoryPrismaMapper } from './prisma/mappers/category.prisma-mapper'
import { CategoryPrismaUtils } from './prisma/utils/category.prisma-utils'

export class CategoryPrismaRepository implements ICategoryRepository {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async create(category: Category): Promise<Category> {
    const createdCategory = await this.prisma.category.create({
      data: {
        cognitoUser: category.props.user,
        incomes: CategoryPrismaUtils.toPrismaCategories(category.props.incomes),
        expenses: CategoryPrismaUtils.toPrismaCategories(
          category.props.expenses
        )
      }
    })
    return CategoryPrismaMapper.toDomain(createdCategory)
  }

  async findByUser(userCognitoId: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        cognitoUser: userCognitoId
      }
    })

    if (!category) {
      return null
    }

    return CategoryPrismaMapper.toDomain(category!)
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
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
