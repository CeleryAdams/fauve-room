import { useTexture } from '@react-three/drei'
import { useState, useEffect } from 'react'

export default function Painting( {model, paintingState, setPainting, toggleTexture, texture, view} )
{

    const tableDayTexture = useTexture('./textures/painting/table_day.jpg')
    const tableNightTexture = useTexture('./textures/painting/table_night.jpg')

    const portraitDayTexture = useTexture('./textures/painting/portrait_day.jpg')
    const portraitNightTexture = useTexture('./textures/painting/portrait_night.jpg')

    const [ dayTexture, setDayTexture ] = useState(tableDayTexture)
    const [ nightTexture, setNightTexture ] = useState(tableNightTexture)


    useEffect(()=>
    {
        if(view && (view.name==='portrait' || view.name==='portrait-vertical'))
        {
            console.log('view set to portrait')
            setDayTexture(portraitDayTexture)
            setNightTexture(portraitNightTexture)
        }
        else
        {
            setDayTexture(tableDayTexture)
            setNightTexture(tableNightTexture)
        }
    }, [view])



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