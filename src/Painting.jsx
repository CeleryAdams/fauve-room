import { useTexture } from '@react-three/drei'
import usePainting from './stores/usePainting.js'


export default function Painting( {model, click} )
{
    const paintingTexture = useTexture('./textures/painting/table_night.jpg')
    paintingTexture.flipY = false

    // const click = usePainting((state) => state.setTextures)

    return <>
        <mesh 
            geometry={ model.geometry } 
            position={ model.position } 
            onClick={ click }
            onPointerEnter={() => {document.body.style.cursor = 'pointer'}}
            onPointerLeave={() => {document.body.style.cursor = 'default'}}
        >
                <meshBasicMaterial map={ paintingTexture } />
        </mesh>
    </>
}