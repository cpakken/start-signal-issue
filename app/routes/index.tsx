import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [result, setResult] = useState('')
  const [abortController, setAbortController] = useState<AbortController | null>(null)

  return (
    <div>
      <div>Hello "/"!</div>
      <button
        onClick={() => {
          setResult('FETCHING...')
          const abort = new AbortController()
          setAbortController(abort)
          fetch('/api/foo', { signal: abort.signal })
            .then((res) => res.json())
            .then(({ data }) => setResult(data))
            .catch((err) => setResult(err.message))
        }}
      >
        FETCH API
      </button>
      <button onClick={() => abortController?.abort()}>ABORT</button>
      <div>{result}</div>
    </div>
  )
}
