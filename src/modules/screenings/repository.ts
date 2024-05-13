import type { Insertable, Selectable, Updateable } from 'kysely'
import type { Database, Screenings } from '@/database'

const TABLE = 'screenings'
type Row = Screenings
type RowWithoutId = Omit<Row, 'id'>
type RowWithoutAvailableTicketsAndId = Omit<RowWithoutId, 'available_tickets'>
type RowInsert = Insertable<RowWithoutAvailableTicketsAndId>
type RowUpdate = Updateable<RowWithoutId>
type RowSelect = Selectable<Row>

export default (db: Database) => ({
  insertNew: async (screening: RowInsert) =>
    db
      .insertInto(TABLE)
      .values({
        movieId: screening.movieId,
        screeningTimestamp: screening.screeningTimestamp,
        totalTickets: screening.totalTickets,
        availableTickets: screening.totalTickets,
      })
      .returningAll()
      .executeTakeFirst(),
})
