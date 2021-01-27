import { useEffect, useRef, useState } from 'react'
import * as esbuild from 'esbuild-wasm'
// import core from '../core'
import './App.css';

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

  const handleInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void = (e) => {
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
      plugins: []
    })

    codeHandler(result.code)
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
