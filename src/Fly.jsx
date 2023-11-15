import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Fly(){

    const fly = useRef()

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime()
        const flyPosition =  elapsedTime * 5
        fly.current.position.x = Math.cos(flyPosition * 2) * (Math.sin(elapsedTime * 1))
        fly.current.position.z = Math.sin(flyPosition) * (Math.sin(elapsedTime * 0.5))
        fly.current.position.y = Math.sin(elapsedTime * 3) * 0.5 + Math.sin(elapsedTime)* 0.2 + 1.5

    })
    
    return <mesh position={[0, 2, 0]} ref={fly}>
        <sphereGeometry args={[0.008, 6, 3]}/>
        <meshBasicMaterial color='black' transparent opacity={0.9}/>
    </mesh>
}