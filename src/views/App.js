import React from 'react'
import HeapWindow from '../components/HeapWindow';
import MemoryMap from '../components/MemoryMap';

function App() {
  return (
    <main>
      <HeapWindow title="Memory map">
        <MemoryMap />
      </HeapWindow>
    </main>
  )
}

export default App
