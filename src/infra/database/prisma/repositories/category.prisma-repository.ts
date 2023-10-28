import { InternalServerError } from '@/application/errors/app-error'
import { CategoryRepository } from '@/application/repositories/category.repository'
import { Category } from '@/domain/entities/category.entity'
import { CategoryTypeEnum } from '@/domain/enums/category-type.enum'
import { PrismaClient } from '@prisma/client'
import { CategoryPrismaMapper } from '../mappers/category.prisma-mapper'

export class CategoryPrismaRepository implements CategoryRepository {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async create(category: Category): Promise<Category> {
    const prismaCategory = CategoryPrismaMapper.toPrismaCategory(category)

    const createdCategory = await this.prisma.category.create({
      data: prismaCategory
    })

    if (!createdCategory) {
      throw new InternalServerError(
        `Couldn't create category ${category.props.description}`
      )
    }

    return CategoryPrismaMapper.toDomain(createdCategory)
  }

  async createMany(categories: Category[]): Promise<void> {
    const prismaCategories = categories.map((category) =>
      CategoryPrismaMapper.toPrismaCategory(category)
    )

    await this.prisma.category.createMany({
      data: prismaCategories
    })
  }
  async findByUser(user: string): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        user: user
      }
    })

    if (!categories) {
      return []
    }

    return categories.map((category) => CategoryPrismaMapper.toDomain(category))
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

    return CategoryPrismaMapper.toDomain(category)
  }

  async findByUserAndDescription(
    user: string,
    description: string
  ): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        user: user,
        description: description
      }
    })

    if (!category) {
      return null
    }

    return CategoryPrismaMapper.toDomain(category!)
  }

  async findByUserAndType(
    user: string,
    type: CategoryTypeEnum
  ): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        user: user,
        type: type
      }
    })

    if (!categories) {
      return []
    }

    return categories.map((category) =>
      CategoryPrismaMapper.toDomain(category!)
    )
  }
}
