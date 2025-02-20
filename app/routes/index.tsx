import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { fooServerFn } from '~/server/foo_fn'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div>Hello "/"!</div>
      <APIExample />
      <ServerFnExample />
    </div>
  )
}

const APIExample = () => {
  const [result, setResult] = useState('')
  const [abortController, setAbortController] = useState<AbortController | null>(null)

  return (
    <div>
      <div>API ROUTE</div>
      <button
        onClick={() => {
          setResult('FETCHING...')
          const abort = new AbortController()
          setAbortController(abort)
          fetch('/api/foo', { signal: abort.signal })
            .then((res) => res.json())
            .then(({ data }) => setResult(data))
            .catch((err) =>
              setResult(
                err.message + '\nCheck console.log in server to see if abort is actually called'
              )
            )
        }}
      >
        FETCH API
      </button>
      <button onClick={() => abortController?.abort()}>ABORT</button>
      <div style={{ whiteSpace: 'pre' }}>{result}</div>
    </div>
  )
}

const ServerFnExample = () => {
  const [result, setResult] = useState('')
  const [abortController, setAbortController] = useState<AbortController | null>(null)

  return (
    <div>
      <div>SERVER FN</div>
      <button
        onClick={() => {
          setResult('FETCHING...')
          const abort = new AbortController()
          setAbortController(abort)
          fooServerFn({ signal: abort.signal })
            .then(({ data }) => setResult(data))
            .catch((err) =>
              setResult(
                err.message + '\nCheck console.log in server to see if abort is actually called'
              )
            )
        }}
      >
        FETCH API
      </button>
      <button onClick={() => abortController?.abort()}>ABORT</button>
      <div style={{ whiteSpace: 'pre' }}>{result}</div>
    </div>
  )
}
