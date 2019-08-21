import React from 'react'

import DesktopFiles from '../components/DesktopFiles'
import DesktopIcon from '../components/DesktopIcon'
import WindowManager from '../components/WindowManager'
import HeapWindow from '../components/HeapWindow'
import MemoryMap from '../components/MemoryMap'

function App() {
  return (
    <main>
      <DesktopFiles>
        <DesktopIcon title="README" />
      </DesktopFiles>
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
