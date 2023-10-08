import { Center, useGLTF, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

export default function App()
{
    const { nodes } = useGLTF('./models/pitcher_scene.glb')
    console.log(nodes)

    return <>
        <Perf position="top-left"/>
        <OrbitControls makeDefault/>

        <Center>
            <mesh geometry={ nodes.glossy.geometry } position={ nodes.glossy.position }>
                <meshNormalMaterial />
            </mesh>

            <mesh geometry={ nodes.matte.geometry } position={ nodes.matte.position }>
                <meshNormalMaterial />
            </mesh>

            <mesh geometry={ nodes.mirrorFrame.geometry } position={ nodes.mirrorFrame.position }>
                <meshNormalMaterial />
            </mesh>

            <mesh geometry={ nodes.mirrorGlass.geometry } position={ nodes.mirrorGlass.position }>
                <meshNormalMaterial />
            </mesh>

            <mesh geometry={ nodes.painting.geometry } position={ nodes.painting.position }>
                <meshNormalMaterial />
            </mesh>

        </Center>

    
    </>
}