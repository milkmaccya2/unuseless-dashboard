import { Hono } from 'hono'

const app = new Hono()

app.get('/', async (c) => {
  const res = await fetch('http://api.open-notify.org/iss-now.json')
  const data = await res.json()
  return c.json(data)
})

export default app
