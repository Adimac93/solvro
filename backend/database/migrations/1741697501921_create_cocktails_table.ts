import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'cocktails'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')

            table.timestamp('created_at')
            table.timestamp('updated_at')

            table.text('name').notNullable()
            table.text('category').notNullable()
            table.text('glass').nullable()
            table.text('instructions').notNullable()
            table.text('image_url').nullable()
            table.boolean('is_alcoholic').notNullable()
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
