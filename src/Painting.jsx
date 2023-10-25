import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useState, useEffect } from 'react'


export default function Painting( {model, click, texture} )
{
    const dayTexture =  useTexture('./textures/painting/portrait_day.jpg')
    const nightTexture = useTexture('./textures/painting/table_night.jpg')

    //set painting to scene texture
    const [paintingState, setPainting] = useState(texture)

    useEffect(() => {setPainting(texture)}, [texture])

    // switch painting time after timeout
    useEffect(() =>{
        const timer = setTimeout(() => {
            setPainting((paintingState === "day") ? "night" : "day")
            
        }, 8000)
        return () => clearTimeout(timer)
    }, [texture])


    let paintingTexture = (paintingState === "day") ? dayTexture : nightTexture
    paintingTexture.flipY = false
    paintingTexture.needsUpdate = true


    return <>
        <mesh 
            geometry={ model.geometry } 
            position={ model.position } 
            onClick={ click }
            onPointerEnter={() => {
                document.body.style.cursor = 'pointer'
                setPainting((paintingState === "day") ? "night" : "day")
            }}
            onPointerLeave={() => {
                document.body.style.cursor = 'default'
                setPainting(texture)
            }}
        >
        {(texture === "night" && paintingState === "day") ? <meshStandardMaterial map={ paintingTexture } /> : <meshBasicMaterial map={ paintingTexture }/>}
        

        </mesh>
    </>
}