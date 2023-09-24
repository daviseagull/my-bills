import { CategoryRepository } from '@/application/repositories/category.repository'
import { Category } from '@/domain/entities/category.entity'
import { PrismaClient } from '@prisma/client'
import { CategoryPrismaMapper } from './prisma/mappers/category.prisma-mapper'

export class CategoryPrismaRepository implements CategoryRepository {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async create(category: Category): Promise<Category> {
    const createdCategory = await this.prisma.category.create({
      data: {
        user: category.props.user,
        incomes: category.props.incomes,
        expenses: category.props.expenses
      }
    })
    return CategoryPrismaMapper.toDomain(createdCategory)
  }

  async findByUser(userId: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        user: userId
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
