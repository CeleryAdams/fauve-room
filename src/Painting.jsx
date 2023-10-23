import { useTexture } from "@react-three/drei"


export default function Painting( {model} )
{
    const paintingTexture = useTexture('./textures/painting/portrait_night.jpg')
    paintingTexture.flipY = false


    return <>
        <mesh geometry={ model.geometry } position={ model.position }>
                <meshBasicMaterial map={ paintingTexture } />
        </mesh>
    </>
}