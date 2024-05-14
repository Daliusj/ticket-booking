import type { Insertable, Selectable, Updateable } from 'kysely'
import type { Database, Tickets } from '@/database'

const TABLE = 'tickets'
type Row = Tickets
type RowWithoutId = Omit<Row, 'id'>
type RowInsert = Insertable<RowWithoutId>
type RowUpdate = Updateable<RowWithoutId>
type RowSelect = Selectable<Row>

export default (db: Database) => ({
  insertNew: async (tickets: RowInsert) =>
    db
      .insertInto(TABLE)
      .values({
        screeningId: tickets.screeningId,
        bookingTimestamp: tickets.bookingTimestamp,
      })
      .returningAll()
      .executeTakeFirst(),
})
