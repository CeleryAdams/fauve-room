import { useTexture } from '@react-three/drei'

export default function Painting( {model, paintingState, setPainting, toggleTexture, texture} )
{
    const dayTexture =  useTexture('./textures/painting/table_day.jpg')
    const nightTexture = useTexture('./textures/painting/table_night.jpg')


    let paintingTexture = (paintingState === "day") ? dayTexture : nightTexture
    paintingTexture.flipY = false
    paintingTexture.needsUpdate = true
    

    return <>
        <mesh 
            geometry={ model.geometry } 
            position={ model.position } 
            onClick={ toggleTexture }
            onPointerEnter={() => {
                document.body.style.cursor = 'pointer'
                setPainting((texture === "day") ? "night" : "day")
            }}
            onPointerLeave={() => {
                document.body.style.cursor = 'default'
                // setPainting(texture)
            }}
        >

        {/* day painting at night factors in environmental lighting */}
        {(texture === "night" && paintingState === "day") ? <meshStandardMaterial map={ paintingTexture } /> : <meshBasicMaterial map={ paintingTexture }/>}
        
        </mesh>
    </>
}