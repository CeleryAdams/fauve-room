import { Reflector } from 'three/examples/jsm/objects/Reflector'
import { useState } from 'react'
import { useTexture } from '@react-three/drei'


export default function Mirror({ frame, glass, texture })
{
    const dayMatcap = useTexture('./textures/day/gilt_matcap.png')
    const nightMatcap = useTexture('./textures/night/gilt_matcap.png')
    
    const matcapTexture = (texture === "day") ? dayMatcap : nightMatcap
    matcapTexture.needsUpdate = true

    //three.js reflector object
    const [ mirrorReflector ] = useState(() => new Reflector(glass.geometry, {
        // clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio
    }))

    mirrorReflector.position.set(glass.position.x, glass.position.y, glass.position.z)


    return <>
        <mesh geometry={ frame.geometry } position={ frame.position }>
            <meshMatcapMaterial matcap={ matcapTexture }/>
        </mesh>

        <primitive object = { mirrorReflector } />
    </>
}