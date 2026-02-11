import { Hono } from 'hono'

const app = new Hono()

app.get('/', async (c) => {
  const lat = c.req.query('lat')
  const lng = c.req.query('lng')

  if (!lat || !lng) {
    return c.json({ error: 'lat and lng are required' }, 400)
  }

  const res = await fetch(
    `https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lng}`
  )
  const data = await res.json()
  return c.json(data)
})

export default app
