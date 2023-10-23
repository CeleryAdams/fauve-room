import { Reflector } from 'three/examples/jsm/objects/Reflector'
import { useState } from 'react'
import { useTexture } from '@react-three/drei'


export default function Mirror({ frame, glass })
{
    const giltMatCapTexture = useTexture('./textures/gilt_matcap.png')
    
    
    //three.js reflector object
    const [ mirrorReflector ] = useState(() => new Reflector(glass.geometry, {
        // clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio
    }))

    mirrorReflector.position.set(glass.position.x, glass.position.y, glass.position.z)


    return <>
        <mesh geometry={ frame.geometry } position={ frame.position }>
            <meshMatcapMaterial matcap={giltMatCapTexture}/>
        </mesh>

        <primitive object = { mirrorReflector } />
    </>
}