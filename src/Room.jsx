import { useTexture } from '@react-three/drei'


export default function Room( {model, texture, setView} )
{

    const dayTexture = useTexture('./textures/day/baked_matte.jpg')
    const nightTexture = useTexture('./textures/night/baked_matte_night.jpg')

        

    const materialMap = (texture === "day") ? dayTexture : nightTexture
    materialMap.flipY = false
    materialMap.needsUpdate = true
    

    return <>
        <mesh geometry={ model.geometry } position={ model.position } onClick={() => setView('mirror')}>
            <meshBasicMaterial map={ materialMap } />
        </mesh>
    </>
}

useTexture.preload('./textures/night/baked_matte_night.jpg')