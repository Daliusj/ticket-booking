import { Kysely, SqliteDatabase } from 'kysely'

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .alterTable('tickets')
    .renameColumn('screening.id', 'screenings_id')
    .execute()
}
