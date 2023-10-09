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
        fov: 50,
        near: 0.1,
        far: 200,
        position: [ 3, 3, 9 ]
      }}
    >
      <App />
    </Canvas>
  </StrictMode>
)