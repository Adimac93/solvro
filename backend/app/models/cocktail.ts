import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Ingredient from './ingredient.js'
import Tag from './tag.js'

export default class Cocktail extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare category: string

  @column()
  declare glass: string

  @column()
  declare instructions: string

  @column()
  declare imageUrl: string

  @column()
  declare isAlcoholic: boolean

  @manyToMany(() => Ingredient, { pivotColumns: ['measure'] })
  declare ingredients: ManyToMany<typeof Ingredient>

  @manyToMany(() => Tag, { pivotColumns: ['name'] })
  declare tags: ManyToMany<typeof Tag>
}
