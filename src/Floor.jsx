import { MeshReflectorMaterial, useTexture } from '@react-three/drei'


export default function Floor()
{
    const floorTexture = useTexture('./textures/floor_1k.jpg')
    const floorRoughness = useTexture('./textures/floor_roughness.jpg')
    const floorAlpha = useTexture('/textures/floor_alpha.jpg')

    
    return <>
        <mesh position={[ 0, 0, 0 ]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[6.1, 6.1]} />
            <MeshReflectorMaterial
                blur={[400, 400]}
                resolution={512}
                mixBlur={10}
                mixStrength={.5}
                depthScale={1}
                minDepthThreshold={.5}
                map={floorTexture}
                alphaMap={ floorAlpha }
                metalness={0}
                roughness={6}
                roughnessMap={floorRoughness}
                transparent
            />
        </mesh>
    </>
}