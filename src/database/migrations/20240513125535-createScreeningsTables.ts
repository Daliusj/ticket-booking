import { Kysely, SqliteDatabase } from 'kysely'

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('screenings')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('movie_id', 'integer', (c) =>
      c.notNull().references('movies.id')
    )
    .addColumn('screening_timestamp', 'text', (c) => c.notNull())
    .addColumn('total_tickets', 'integer', (c) => c.notNull())
    .addColumn('available_tickets', 'integer')
    .execute()

  await db.schema
    .createTable('tickets')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('screening.id', 'integer', (c) =>
      c.notNull().references('screenings.id')
    )
    .addColumn('booking_timestamp', 'text', (c) => c.notNull())
    .execute()
}
