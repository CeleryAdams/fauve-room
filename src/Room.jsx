import { useTexture } from '@react-three/drei'


export default function Room( {model, texture} )
{

    const dayTexture = useTexture('./textures/day/baked_matte.jpg')
    const nightTexture = useTexture('./textures/night/baked_matte.jpg')

        

    const materialMap = (texture === "day") ? dayTexture : nightTexture
    materialMap.flipY = false
    materialMap.needsUpdate = true
    

    return <>
        <mesh geometry={ model.geometry } position={ model.position }>
            <meshBasicMaterial map={ materialMap } />
        </mesh>
    </>
}

useTexture.preload('./textures/baked_matte_recolor.jpg')