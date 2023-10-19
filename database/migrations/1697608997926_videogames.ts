import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'videogames'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("name").notNullable()
      table.string("description").notNullable()
      table.string("image").notNullable()
      table.integer("price").notNullable()
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE').onUpdate('CASCADE')


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
