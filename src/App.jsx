import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

export default function App()
{
    return <>
        <Perf position="top-left"/>
        <OrbitControls makeDefault/>

        <mesh>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh>

    
    </>
}