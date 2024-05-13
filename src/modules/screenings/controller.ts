import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRespository from './repository'

export default (db: Database) => {
  const messages = buildRespository(db)
  const router = Router()

  router.post(
    '/',
    jsonRoute(async (req, res) => {
      const screening = await messages.insertNew(req.body)
      res.status(200)
      res.json(screening)
    })
  )

  return router
}
