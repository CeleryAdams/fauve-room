import { useTexture } from '@react-three/drei'
import { MeshBakedMaterial } from './MeshBakedMaterial.js'
import * as THREE from 'three'


export default function Tabletop( {glossyObjects, tabletop, pitcher, texture} )
{
    const dayTexture = useTexture('./textures/day/baked_glossy.jpg')
    const nightTexture = useTexture('./textures/night/baked_glossy_night.jpg')


    const materialMap = (texture === "day") ? dayTexture : nightTexture
    materialMap.colorSpace = THREE.SRGBColorSpace
    materialMap.flipY = false
    materialMap.needsUpdate = true
    

    const glossyRoughness = useTexture('./textures/baked_glossy_roughness.jpg')
    glossyRoughness.flipY = false


    const dayMatcap = useTexture('./textures/day/black_matcap.png')
    const nightMatcap = useTexture('./textures/night/black_matcap_night.png')

    const matcapTexture = (texture === "day") ? dayMatcap : nightMatcap
    matcapTexture.needsUpdate = true


    const roughnessValue = (texture === "day") ? 3 : 1.5


    //custom material for glossy objects roughness 3 daytime
    const meshBakedMaterial =  new MeshBakedMaterial({map: materialMap, roughness: roughnessValue, roughnessMap: glossyRoughness})
    
    return <>
        <mesh 
            geometry={ glossyObjects.geometry } 
            position={ glossyObjects.position } 
            material={ meshBakedMaterial }
        />

        <mesh geometry={ tabletop.geometry } position={ tabletop.position }>
            <meshBasicMaterial map={ materialMap } />
        </mesh>

        <mesh geometry ={ pitcher.geometry } position={ pitcher.position }>
            <meshMatcapMaterial matcap={matcapTexture}/>
        </mesh>
    </>
}
useTexture.preload('./textures/night/baked_glossy_night.jpg')
useTexture.preload('./textures/night/black_matcap_night.png')