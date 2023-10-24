import { useTexture } from "@react-three/drei"


export default function Painting( {model, handleClick, clickState} )
{
    const paintingTexture = useTexture('./textures/painting/portrait_night.jpg')
    paintingTexture.flipY = false

    const click = () => console.log("click")

    return <>
        <mesh 
            geometry={ model.geometry } 
            position={ model.position } 
            onClick={ handleClick }
            onPointerEnter={() => {document.body.style.cursor = 'pointer'}}
            onPointerLeave={() => {document.body.style.cursor = 'default'}}
        >
                <meshBasicMaterial map={ paintingTexture } />
        </mesh>
    </>
}