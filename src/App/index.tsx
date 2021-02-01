import { useEffect, useRef, useState } from 'react'
import * as esbuild from 'esbuild-wasm'
import { plugins } from '../core'

function App() {

  const ref = useRef<any>()

  const [input, inputHandler] = useState('')
  const [code, codeHandler] = useState('')

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })

  }

  useEffect(() => {
    startService()
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    (inputHandler(e.target.value))
  }

  const handleOnClick = async () => {
    if (!ref.current) {
      return
    }

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [plugins.unpkgPathPlugin()]
    })

    codeHandler(result.outputFiles[0].text)
  }

  return (
    <div className="App">
      <textarea
        onChange={handleInput}
        value={input}
      ></textarea>
      <div>
        <button
          onClick={handleOnClick}
        >
          Submit
        </button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
