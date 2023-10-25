import { MeshReflectorMaterial, useTexture } from '@react-three/drei'


export default function Floor( {texture} )
{
    const dayTexture = useTexture('./textures/day/floor_1k.jpg')
    const nightTexture = useTexture('./textures/night/floor_1k.jpg')


    const floorRoughness = useTexture('./textures/floor_roughness.jpg')
    const floorAlpha = useTexture('/textures/floor_alpha.jpg')

    const materialMap = (texture === "day") ? dayTexture : nightTexture
    materialMap.needsUpdate = true

    
    return <>
        <mesh position={[ 0, 0, 0 ]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[6.1, 6.1]} />
            <MeshReflectorMaterial
                blur={[400, 400]}
                resolution={512}
                mixBlur={10}
                mixStrength={ (texture === "day") ? 0.5 : 20 }
                depthScale={1}
                minDepthThreshold={.5}
                map={ materialMap }
                alphaMap={ floorAlpha }
                metalness={0}
                roughness={ (texture === "day") ? 6 : 6 }
                roughnessMap={floorRoughness}
                transparent
            />
        </mesh>
    </>
}