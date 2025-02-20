import { createServerFn } from '@tanstack/start'

export const fooServerFn = createServerFn({ method: 'POST' }).handler(async ({ signal }) => {
  signal.addEventListener('abort', () => {
    //THIS IS NEVER RUN!!!!
    //This should run when abort controller is called on the client side
    //Or when the client disconnects
    console.log('ABORTED: THIS NEVER RUNS!')
    throw new Error('aborted')
  })

  await new Promise((resolve) => setTimeout(resolve, 2000))

  //Why is this signal already aborted?!? when abort is not called?
  console.log('RETURNED SUCCESS BUT IS Signal aborted?', signal.aborted)

  return {
    data: 'SERVER FN: FOO!',
  }
})
