import { useRef, useState } from 'react'

import './App.css'
import CurveArrow from './CurveArrow'
import DraggableDiv from './DraggableDiv'

function App() {
  const [count, setCount] = useState(0)
  const startRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  return (
    <div className="App">
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      <CurveArrow />

      <DraggableDiv ref={startRef}>start</DraggableDiv>

      <DraggableDiv ref={endRef}>end</DraggableDiv>
    </div>
  )
}

export default App
