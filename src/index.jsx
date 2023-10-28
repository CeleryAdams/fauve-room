import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import World from './World.jsx'
import { StrictMode, Suspense } from 'react'
import { useProgress, Html, Loader, Preload } from "@react-three/drei"

// function Loader() {
//     const { active, progress, errors, item, loaded, total } = useProgress()
//     return <Html center>{progress} % loaded</Html>
//   }

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
      <>
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
            <Preload all/>
          </Suspense>
        </Canvas>
        <Loader />
      </>
)