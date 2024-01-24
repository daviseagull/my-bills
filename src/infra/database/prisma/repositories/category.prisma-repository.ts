import { PrismaClient } from '@prisma/client'
import {
  BadRequestError,
  InternalServerError
} from 'application/errors/app-error'
import { ICategoryRepository } from 'application/repositories/category.repository'
import { Category } from 'domain/entities/category.entity'
import { CategoryTypeEnum } from 'domain/enums/category-type.enum'
import logger from 'infra/logger/logger'
import { CategoryPrismaMapper } from '../mappers/category.prisma-mapper'

export class CategoryPrismaRepository implements ICategoryRepository {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async create(category: Category): Promise<Category> {
    logger.info(`category: ${JSON.stringify(category)}`)
    const createdCategory = await this.prisma.category.create({
      data: {
        description: category.props.description.props.value,
        color: category.props.color.props.value,
        parent_id: category.props.parent?.props.value,
        active: category.props.active,
        type: category.props.type,
        cognito_id: category.props.user.props.value
      }
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
        cognito_id: user
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
    const category = await this.prisma.category.findFirst({
      where: {
        cognito_id: user,
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
        cognito_id: user,
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

  async findByUserAndId(user: string, id: string): Promise<Category | null> {
    const category = await this.prisma.category.findFirst({
      where: {
        cognito_id: user,
        id: id
      }
    })

    if (!category) {
      return null
    }

    return CategoryPrismaMapper.toDomain(category!)
  }

  async update(categoryToUpdate: Category): Promise<Category> {
    const category = await this.findByUserAndId(
      categoryToUpdate.props.user.props.value,
      categoryToUpdate.id!
    )

    if (!category) {
      throw new BadRequestError(
        `Couldn't find category with id ${categoryToUpdate.id}`
      )
    }

    const updatedCategory = await this.prisma.category.update({
      where: {
        id: categoryToUpdate.id
      },
      data: {
        description: categoryToUpdate.props.description.props.value,
        color: categoryToUpdate.props.color.props.value,
        cognito_id: categoryToUpdate.props.parent?.props.value,
        active: categoryToUpdate.props.active
      }
    })

    if (!updatedCategory) {
      throw new InternalServerError(
        `Couldn't update category ${categoryToUpdate.id}`
      )
    }

    return CategoryPrismaMapper.toDomain(updatedCategory)
  }
}
