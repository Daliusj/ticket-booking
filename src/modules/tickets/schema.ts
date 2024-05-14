import { z } from 'zod'
import type { Tickets } from '@/database'

type Record = Tickets

const schema = z.object({
  id: z.coerce.number().int().positive(),
  screeningId: z.number().int().positive(),
  bookingTimestamp: z.string().datetime(),
})

const insertable = schema.omit({
  id: true,
})
const updateable = insertable.partial()

export const parse = (record: Record) => schema.parse(record)
export const parseId = (id: unknown) => schema.shape.id.parse(id)
export const parseInsertables = (record: unknown) => insertable.parse(record)
export const parseUpdatables = (record: unknown) => updateable.parse(record)

export const keys: (keyof Record)[] = Object.keys(
  schema.shape
) as (keyof z.infer<typeof schema>)[]
