import { Environment, Center, MeshReflectorMaterial, OrbitControls, useGLTF, useHelper, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Perf } from 'r3f-perf'
import { MeshBakedMaterial } from './MeshBakedMaterial.js'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import { useControls } from 'leva'
import { useRef } from 'react'


export default function App()
{
    //debug
    const { lightPosition, reflectorPosition, lightIntensity, lightColor } = useControls({
        lightPosition:
        {
            value: {x: 3.37, y: 1, z: 0},
            step: 0.01
        },
        lightIntensity:
        {
            value: 15,
            step: 0.1
        },
        lightColor: '#e2dccb',
        reflectorPosition:
        {
            value: {x: 3, y: -1.47, z: 2},
            step: 0.01
        },
    
    })

    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    //load textures
    const glossyTexture = useTexture('./textures/baked_glossy.jpg')
    glossyTexture.flipY = false
    glossyTexture.colorSpace = THREE.SRGBColorSpace

    const glossyRoughness = useTexture('./textures/baked_glossy_roughness.png')
    glossyRoughness.flipY = false

    const matteTexture = useTexture('./textures/baked_matte.jpg')
    matteTexture.flipY = false

    const paintingTexture = useTexture('./textures/painting/portrait_night.jpg')
    paintingTexture.flipY = false

    const giltMatCapTexture = useTexture('./textures/gilt_matcap.png')

    const blackMatCapTexture = useTexture('./textures/black_matcap.png')

    const floorTexture = useTexture('./textures/floor.jpg')
    const floorRoughness = useTexture('./textures/floor_roughness.jpg')


    //custom material for glossy objects
    const meshBakedMaterial = new MeshBakedMaterial({map: glossyTexture, roughness: 5, roughnessMap: glossyRoughness})

    //load model
    const { nodes } = useGLTF('./models/pitcher_scene.glb')
    const pitcherTest = useGLTF('./models/pitcher.glb').nodes.large_pitcher_table

    console.log(pitcherTest)

    //three.js reflector object
    const mirrorReflector = new Reflector(nodes.mirrorGlass.geometry, {
        // clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio
    })
    mirrorReflector.position.set(nodes.mirrorGlass.position.x, nodes.mirrorGlass.position.y, nodes.mirrorGlass.position.z)



    return <>
        <Perf position="top-left"/>
        <OrbitControls makeDefault/>

        <Environment
            background = {'only'}
            files={[
                './environment/px.png',
                './environment/nx.png',
                './environment/py.png',
                './environment/ny.png',
                './environment/pz.png',
                './environment/nz.png',
            ]}
        />
            

        <directionalLight color={lightColor} intensity= { lightIntensity } ref={ directionalLight } position = {[ lightPosition.x, lightPosition.y, lightPosition.z ]}/>

        <Center>

        <mesh position={[ 0, .1, 0 ]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[6.1, 6.1]} />
                <MeshReflectorMaterial
                    blur={[400, 400]}
                    resolution={512}
                    mixBlur={10}
                    mixStrength={.5}
                    depthScale={1}
                    minDepthThreshold={.5}
                    map={floorTexture}
                    metalness={0}
                    roughness={6}
                    roughnessMap={floorRoughness}
                />
                </mesh>

            <mesh geometry={ nodes.glossy.geometry } position={ nodes.glossy.position } material={ meshBakedMaterial }/>

            <mesh geometry ={ pitcherTest.geometry } position={[0, 1, 1]}>
                <meshMatcapMaterial matcap={blackMatCapTexture}/>
            </mesh>

            <mesh geometry={ nodes.matte.geometry } position={ nodes.matte.position }>
                <meshBasicMaterial map={ matteTexture } />
            </mesh>

            <mesh geometry={ nodes.mirrorFrame.geometry } position={ nodes.mirrorFrame.position }>
                <meshMatcapMaterial matcap={giltMatCapTexture}/>
            </mesh>

            <primitive object = { mirrorReflector } />

            <mesh geometry={ nodes.painting.geometry } position={ nodes.painting.position }>
                <meshBasicMaterial map={ paintingTexture } />
            </mesh>

        </Center>

    
    </>
}