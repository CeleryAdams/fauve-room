import { Center, MeshReflectorMaterial, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Perf } from 'r3f-perf'
import { extend } from '@react-three/fiber'
import { MeshBakedMaterial } from './MeshBakedMaterial.js'
import { Reflector } from 'three/examples/jsm/objects/Reflector'


export default function App()
{
    const { nodes } = useGLTF('./models/pitcher_scene.glb')

    const glossyTexture = useTexture('./textures/baked_glossy.jpg')
    glossyTexture.flipY = false
    glossyTexture.colorSpace = THREE.SRGBColorSpace

    const matteTexture = useTexture('./textures/baked_matte.jpg')
    matteTexture.flipY = false

    const paintingTexture = useTexture('./textures/painting/portrait_night.jpg')
    paintingTexture.flipY = false

    const matCapMaterial = useTexture('./textures/gilt_matcap.png')

    const meshBakedMaterial = new MeshBakedMaterial({map: glossyTexture})

    const mirrorReflector = new Reflector(nodes.mirrorGlass.geometry, {
        // clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio
    })
    mirrorReflector.position.set(nodes.mirrorGlass.position.x, nodes.mirrorGlass.position.y, nodes.mirrorGlass.position.z)



    return <>
        <Perf position="top-left"/>
        <OrbitControls makeDefault/>
        <ambientLight intensity={0.1}/>
        <Center>
            <mesh geometry={ nodes.glossy.geometry } position={ nodes.glossy.position } material={ meshBakedMaterial }/>

            <mesh geometry={ nodes.matte.geometry } position={ nodes.matte.position }>
                <meshBasicMaterial map={ matteTexture } />
            </mesh>

            <mesh geometry={ nodes.mirrorFrame.geometry } position={ nodes.mirrorFrame.position }>
                <meshMatcapMaterial matcap={matCapMaterial}/>
            </mesh>

            <primitive object = { mirrorReflector } />

            <mesh geometry={ nodes.painting.geometry } position={ nodes.painting.position }>
                <meshBasicMaterial map={ paintingTexture } />
            </mesh>

        </Center>

    
    </>
}