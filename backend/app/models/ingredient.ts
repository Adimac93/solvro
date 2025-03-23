import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Cocktail from './cocktail.js'

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare isAlcoholic: boolean

  @column()
  declare type: string

  @column()
  declare percentage: number

  @column()
  declare imageUrl: string

  @manyToMany(() => Cocktail, { pivotColumns: ['measure'] })
  declare cocktails: ManyToMany<typeof Cocktail>
}
