import { useTexture } from '@react-three/drei'
import { MeshBakedMaterial } from './MeshBakedMaterial.js'
import { useState } from 'react'
import * as THREE from 'three'


export default function Tabletop( {glossyObjects, tabletop, pitcher} )
{
    const glossyTexture = useTexture('./textures/baked_glossy.jpg')
    glossyTexture.flipY = false
    glossyTexture.colorSpace = THREE.SRGBColorSpace

    const glossyRoughness = useTexture('./textures/baked_glossy_roughness.jpg')
    glossyRoughness.flipY = false

    const blackMatCapTexture = useTexture('./textures/black_matcap.png')


    //custom material for glossy objects
    const [ meshBakedMaterial ] = useState(() => new MeshBakedMaterial({map: glossyTexture, roughness: 3, roughnessMap: glossyRoughness}))

    
    return <>
        <mesh 
            geometry={ glossyObjects.geometry } 
            position={ glossyObjects.position } 
            material={ meshBakedMaterial }
        />

        <mesh geometry={ tabletop.geometry } position={ tabletop.position }>
            <meshBasicMaterial map={ glossyTexture } />
        </mesh>

        <mesh geometry ={ pitcher.geometry } position={ pitcher.position }>
            <meshMatcapMaterial matcap={blackMatCapTexture}/>
        </mesh>
    </>
}