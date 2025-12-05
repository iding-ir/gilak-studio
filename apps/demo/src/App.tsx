import { GilakCanvas } from 'gilak-canvas'
import { GilakEyedrop } from 'gilak-eyedropper'
import './App.css'

function App() {
  return (
    <>
      <div>
        <h1>Gilak Studio Demo</h1>
        <p>Demonstrating the gilak-canvas and gilak-eyedropper packages</p>
      </div>

      <div className="card">
        <GilakCanvas />
        <GilakEyedrop />
      </div>

      <p className="read-the-docs">These are placeholder components from the workspace packages</p>
    </>
  )
}

export default App
