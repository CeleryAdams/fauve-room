import { Environment, Center, MeshReflectorMaterial, OrbitControls, useGLTF, useHelper, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Perf } from 'r3f-perf'
import { MeshBakedMaterial } from './MeshBakedMaterial.js'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import { useControls } from 'leva'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function App()
{

    let lerpedFov = 45
    const [ origin ] = useState(() => new THREE.Vector3(0, 0, 0))

    useFrame((state, delta) => {

        let fovFactor = state.camera.position.distanceTo(origin) / 3
        state.camera.fov = Math.max(fovFactor * 45, 20)
        state.camera.updateProjectionMatrix()
        
        lerpedFov = THREE.MathUtils.lerp(lerpedFov, state.camera.fov, 10 * delta)
        state.camera.fov = lerpedFov
        console.log(lerpedFov)
        console.log(state.camera.fov)
    
    })
    
    //debug
    const { lightPosition, lightIntensity, lightColor } = useControls({
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
    const fruitTexture = useTexture('./textures/baked_fruits_1k.jpg')
    fruitTexture.flipY = false
    fruitTexture.colorSpace = THREE.SRGBColorSpace

    const fruitRoughness = useTexture('./textures/baked_fruits_roughness.jpg')
    fruitRoughness.flipY = false

    const matteTexture = useTexture('./textures/baked_matte_denoised.jpg')
    matteTexture.flipY = false

    const paintingTexture = useTexture('./textures/painting/portrait_night.jpg')
    paintingTexture.flipY = false

    const giltMatCapTexture = useTexture('./textures/gilt_matcap.png')

    const blackMatCapTexture = useTexture('./textures/black_matcap.png')

    const floorTexture = useTexture('./textures/floor_1k.jpg')
    const floorRoughness = useTexture('./textures/floor_roughness.jpg')

    const tableTexture = useTexture('./textures/baked_tabletop_1k.jpg')
    tableTexture.flipY = false


    //custom material for glossy objects
    const [ meshBakedMaterial ] = useState(() => new MeshBakedMaterial({map: fruitTexture, roughness: 2, roughnessMap: fruitRoughness}))

    //load model
    const { nodes } = useGLTF('./models/pitcher_scene.glb')

    //three.js reflector object
    const [ mirrorReflector ] = useState(() => new Reflector(nodes.mirrorGlass.geometry, {
        // clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio
    }))
    mirrorReflector.position.set(nodes.mirrorGlass.position.x, nodes.mirrorGlass.position.y, nodes.mirrorGlass.position.z)


    return <>
        <Perf position="top-left"/>
        <OrbitControls makeDefault 
            target={[ 0, -0.4, 0]}
            maxDistance={ 4 }
            maxPolarAngle={ Math.PI - 1.45 }
            zoomSpeed = { 0.7 }    
        />

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

        <mesh position={[ 0, 0, 0 ]} rotation={[-Math.PI / 2, 0, 0]}>
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

            <mesh geometry={ nodes.fruits.geometry } position={ nodes.fruits.position } material={ meshBakedMaterial }/>

            <mesh geometry ={ nodes.pitcher.geometry } position={ nodes.pitcher.position }>
                <meshMatcapMaterial matcap={blackMatCapTexture}/>
            </mesh>

            <mesh geometry={ nodes.matte.geometry } position={ nodes.matte.position }>
                <meshBasicMaterial map={ matteTexture } />
            </mesh>

            <mesh geometry={ nodes.tabletop.geometry } position={ nodes.tabletop.position }>
                <meshBasicMaterial map={ tableTexture } />
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