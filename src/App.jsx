import { Center, useGLTF, useTexture, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

export default function App()
{
    const { nodes } = useGLTF('./models/pitcher_scene.glb')

    const glossyTexture = useTexture('./textures/baked_glossy.jpg')
    glossyTexture.flipY = false

    const matteTexture = useTexture('./textures/baked_matte.jpg')
    matteTexture.flipY = false

    const paintingTexture = useTexture('./textures/painting/portrait_night.jpg')
    paintingTexture.flipY = false


    return <>
        <Perf position="top-left"/>
        <OrbitControls makeDefault/>

        <Center>
            <mesh geometry={ nodes.glossy.geometry } position={ nodes.glossy.position }>
                <meshBasicMaterial map ={ glossyTexture }/>
            </mesh>

            <mesh geometry={ nodes.matte.geometry } position={ nodes.matte.position }>
                <meshBasicMaterial map={ matteTexture } />
            </mesh>

            <mesh geometry={ nodes.mirrorFrame.geometry } position={ nodes.mirrorFrame.position }>
                <meshNormalMaterial />
            </mesh>

            <mesh geometry={ nodes.mirrorGlass.geometry } position={ nodes.mirrorGlass.position }>
                <meshNormalMaterial />
            </mesh>

            <mesh geometry={ nodes.painting.geometry } position={ nodes.painting.position }>
                <meshBasicMaterial map={ paintingTexture } />
            </mesh>

        </Center>

    
    </>
}