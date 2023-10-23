import { useTexture } from '@react-three/drei'


export default function Room( {model} )
{
    const matteTexture = useTexture('./textures/baked_matte_denoised.jpg')
    matteTexture.flipY = false


    return <>
        <mesh geometry={ model.geometry } position={ model.position }>
            <meshBasicMaterial map={ matteTexture } />
        </mesh>
    </>
}