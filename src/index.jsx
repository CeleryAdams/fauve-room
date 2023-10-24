import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import World from './World.jsx'
import { StrictMode, Suspense } from 'react'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <StrictMode>
      <Canvas 
        flat
        camera ={{
          near: 0.3,
          far: 200,
          position: [ 1.7, -0.25, 2.7 ],
        }}
      >
      <Suspense>
        <World />
      </Suspense>
      </Canvas>
  </StrictMode>
)