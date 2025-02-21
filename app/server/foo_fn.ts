import { createServerFn } from '@tanstack/start'

export const fooServerFn = createServerFn({ method: 'POST' }).handler(async ({ signal }) => {
  return new Promise<{ data: string }>((resolve, reject) => {
    console.log('FETCHING...')
    signal.addEventListener('abort', () => {
      //THIS IS NEVER RUN!!!!
      //This should run when abort controller is called on the client side
      //Or when the client disconnects

      console.log('ABORTED: THIS NEVER RUNS!')
      reject(new Error('aborted'))
    })

    setTimeout(() => {
      resolve({ data: 'API: DATA IS FOO!' })
    }, 2000)
  })
})
