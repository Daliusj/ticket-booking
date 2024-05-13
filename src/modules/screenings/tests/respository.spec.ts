import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor, selectAllFor } from '@tests/utils/records'
import buildRepository from '../repository'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createMovies = createFor(db, 'movies')
const selectAllScreenings = selectAllFor(db, 'screenings')

describe('createScreening', () => {
  it('should return inserted row data', async () => {
    await createMovies([
      {
        id: 22,
        title: 'The Dark Knight',
        year: 2008,
      },
    ])
    const screening = await repository.insertNew({
      movieId: 22,
      screeningTimestamp: '2024-12-12 20:00',
      totalTickets: 100,
    })
    expect(screening).toEqual({
      id: 1,
      movieId: 22,
      screeningTimestamp: '2024-12-12 20:00',
      totalTickets: 100,
      availableTickets: 100,
    })
  })
  it('should insert new row in the table', async () => {
    const allScreenings = await selectAllScreenings()
    expect(allScreenings).toHaveLength(1)
    expect(allScreenings).toEqual([
      {
        id: 1,
        movieId: 22,
        screeningTimestamp: '2024-12-12 20:00',
        totalTickets: 100,
        availableTickets: 100,
      },
    ])
  })
})
