import { useTexture } from '@react-three/drei'
import { useEffect } from 'react'
import usePainting from './stores/usePainting'
import * as THREE from 'three'


export default function Room( {model, texture} )
{

    const dayTexture = useTexture('./textures/baked_matte_denoised.jpg')
    dayTexture.flipY = false

    const redTexture = useTexture('./textures/baked_matte_recolor.jpg')
    redTexture.flipY = false
        
    
    let materialMap = dayTexture
    if (texture === "red")
    {
        materialMap = redTexture
        materialMap.needsUpdate = true
    }


    // useEffect(()=>
    // {
    //     const unsubscribe = usePainting.subscribe(
    //         (state) => state.textures,
    //         (value) => console.log('room texture set to', value)
    //     )

    //     return () => unsubscribe()
    // })


    return <>
        <mesh geometry={ model.geometry } position={ model.position }>
            <meshBasicMaterial map={ materialMap } />
        </mesh>
    </>
}

useTexture.preload('./textures/baked_matte_recolor.jpg')