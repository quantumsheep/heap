import React from 'react'
import WindowManager from '../components/WindowManager'
import HeapWindow from '../components/HeapWindow'
import MemoryMap from '../components/MemoryMap'

function App() {
  return (
    <main>
      <WindowManager>
        <HeapWindow title="Memory map">
          <MemoryMap />
        </HeapWindow>
        <HeapWindow title="Memory map">
          <MemoryMap />
        </HeapWindow>
      </WindowManager>
    </main>
  )
}

export default App
