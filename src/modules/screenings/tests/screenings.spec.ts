import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import createApp from '@/app'

const db = await createTestDatabase()
const app = createApp(db)
const createMovies = createFor(db, 'movies')

describe('post', () => {
  it('should return inserted row data', async () => {
    await createMovies([
      {
        id: 22,
        title: 'The Dark Knight',
        year: 2008,
      },
    ])
    const { body } = await supertest(app)
      .post('/screenings')
      .send({
        movieId: 22,
        screeningTimestamp: '2024-12-12 20:00',
        totalTickets: 100,
      })
      .expect(200)
    expect(body).toEqual({
      id: 1,
      movieId: 22,
      screeningTimestamp: '2024-12-12 20:00',
      totalTickets: 100,
      availableTickets: 100,
    })
  })
})
