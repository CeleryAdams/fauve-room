import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import World from './World.jsx'
import { StrictMode } from 'react'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <StrictMode>
    <Canvas 
      flat
      camera ={{
        near: 0.1,
        far: 200,
        position: [ 1.7, -0.25, 2.7 ],
      }}
    >
      <World />
    </Canvas>
  </StrictMode>
)