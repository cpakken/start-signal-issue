import { json } from '@tanstack/start'
import { createAPIFileRoute } from '@tanstack/start/api'

export const APIRoute = createAPIFileRoute('/api/foo')({
  GET: async ({ request }) => {
    const { signal } = request
    signal.addEventListener('abort', () => {
      //THIS IS NEVER RUN!!!!
      //This should run when abort controller is called on the client side
      //Or when the client disconnects

      console.log('ABORTED: THIS NEVER RUNS!')
      throw new Error('aborted')
    })

    console.log('FETCHING...')

    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('RETURNED SUCCESS BUT IS Signal aborted?', signal.aborted)

    return json({
      data: 'API: DATA IS FOO!',
    })
  },
})
