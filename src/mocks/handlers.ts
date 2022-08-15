// src/mocks/handlers.js
import { rest } from 'msw'

const handlers = [
  // Handles a POST /login request
  rest.post('/api/write', async (req, res, ctx) => {
    const result = await req.json()
    return res(ctx.status(200), ctx.delay(1000), ctx.json(result))
  }),

  // Handles a GET /user request
  rest.get('/user', null),
]

export default handlers
