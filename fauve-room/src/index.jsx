import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import App from './App.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <>
    <Canvas 
      camera ={{
        fov: 20,
        near: 0.1,
        far: 200,
        position: [ 3, 3, 9 ]
      }}
    >
      <App />
    </Canvas>
  </>
)