import { Canvas } from '@react-three/fiber'
import World from './World.jsx'
import { Suspense, useState, useEffect } from 'react'
import { useProgress, Html, Loader, Preload } from "@react-three/drei"
import { Perf } from 'r3f-perf'
import Fish from './Fish.jsx'
import Dance from './Dance.jsx'
import Jug from './Jug.jsx'
import Table from './Table.jsx'

export default function App()
{
    const [ image, setImage ] = useState(null)

    useEffect(()=>
    {
        const handleKeyDown = (event) => event.key === 'Escape' && setImage(null)

        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return <>
        <Canvas 
        flat
        camera ={{
            near: 0.3,
            far: 200,
            position: [ 1.7, -0.25, 2.7 ],
        }}
        >
        {/* <Perf /> */}
        <Suspense>
            <World image = { image } setImage={ setImage }/>
            <Preload all/>
        </Suspense>
        </Canvas>

        <div className='overlay'>
            { image === 'fish' && <Fish setImage={ setImage } />}
            { image === 'dance' && <Dance setImage={ setImage } />}
            { image === 'jug' && <Jug setImage={ setImage } />}
            { image === 'table' && <Table setImage={ setImage } />}
        </div>

        <button className='info'>i</button>

        <Loader />
    </>
}