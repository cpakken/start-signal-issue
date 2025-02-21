import { json } from '@tanstack/start'
import { createAPIFileRoute } from '@tanstack/start/api'

export const APIRoute = createAPIFileRoute('/api/foo')({
  GET: ({ request }) => {
    return new Promise((resolve, reject) => {
      console.log('FETCHING...')
      const { signal } = request
      signal.addEventListener('abort', () => {
        //THIS IS NEVER RUN!!!!
        //This should run when abort controller is called on the client side
        //Or when the client disconnects

        console.log('ABORTED: THIS NEVER RUNS!')
        reject(new Error('aborted'))
      })

      setTimeout(() => {
        resolve(json({ data: 'API: DATA IS FOO!' }))
      }, 2000)
    })
  },
})
