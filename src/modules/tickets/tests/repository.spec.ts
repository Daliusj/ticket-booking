import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor, selectAllFor } from '@tests/utils/records'
import buildRepository from '../repository'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screenings')
const selectAllBookings = selectAllFor(db, 'tickets')

describe('createBookings', () => {
  it('should return inserted row data', async () => {
    await createMovies([
      {
        id: 22,
        title: 'The Dark Knight',
        year: 2008,
      },
    ])
    await createScreenings([
      {
        movieId: 22,
        screeningTimestamp: '2024-12-12T20:00:00Z',
        totalTickets: 100,
      },
    ])
    const booking = await repository.insertNew({
      screeningId: 1,
      bookingTimestamp: '2024-12-10T12:00:00Z',
    })
    expect(booking).toEqual({
      id: 1,
      screeningId: 1,
      bookingTimestamp: '2024-12-10T12:00:00Z',
    })
  })
  it('should insert a new row in the table', async () => {
    const allBookings = await selectAllBookings()
    expect(allBookings).toHaveLength(1)
    expect(allBookings).toEqual([
      {
        id: 1,
        screeningId: 1,
        bookingTimestamp: '2024-12-10T12:00:00Z',
      },
    ])
  })
})
