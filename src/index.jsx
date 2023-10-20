import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import App from './App.jsx'
import { StrictMode } from 'react'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <StrictMode>
    <Canvas 
      flat
      camera ={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [ 1.51, -0.25, 2.63 ],
      }}
    >
      <App />
    </Canvas>
  </StrictMode>
)