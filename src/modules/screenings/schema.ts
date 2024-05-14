import { z } from 'zod'
import type { Screenings } from '@/database'

type Record = Screenings

const schema = z.object({
  id: z.coerce.number().int().positive(),
  movieId: z.number().int().positive(),
  screeningTimestamp: z.string().datetime(),
  totalTickets: z.number().int().positive().max(300).min(20),
  availableTickets: z.number().int().positive(),
})

const insertable = schema.omit({
  id: true,
  availableTickets: true,
})
const updateable = insertable.partial()

export const parse = (record: Record) => schema.parse(record)
export const parseId = (id: unknown) => schema.shape.id.parse(id)
export const parseInsertables = (record: unknown) => insertable.parse(record)
export const parseUpdatables = (record: unknown) => updateable.parse(record)

export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
