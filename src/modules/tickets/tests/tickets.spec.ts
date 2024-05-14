import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import createApp from '@/app'

const db = await createTestDatabase()
const app = createApp(db)
const createMovies = createFor(db, 'movies')
const createScreenings = createFor(db, 'screenings')

describe('post', () => {
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
    const { body } = await supertest(app)
      .post('/tickets')
      .send({
        screeningId: 1,
        bookingTimestamp: '2024-12-10T12:00:00Z',
      })
      .expect(200)

    expect(body).toEqual({
      id: 1,
      screeningId: 1,
      bookingTimestamp: '2024-12-10T12:00:00Z',
    })
  })
})
