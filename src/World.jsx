import { Center, OrbitControls, useGLTF} from '@react-three/drei'
import * as THREE from 'three'
import { Perf } from 'r3f-perf'
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import Stage from './Stage.jsx'
import Room from './Room.jsx'
import Tabletop from './Tabletop.jsx'
import Mirror from './Mirror.jsx'
import Floor from './Floor.jsx'
import Painting from './Painting.jsx'


export default function World()
{
    const fov = 42
    let lerpedFov = fov
    const [ origin ] = useState(() => new THREE.Vector3(0, 0, 0))
    const orbitRef = useRef()

    

    // const [texture, setTexture] = useState('day')

    const [texture, setTexture] = useState(() => {
        const savedTexture = localStorage.getItem('texture') || 'day';
        return savedTexture;
      });

    
    const click = () => texture === 'day' ? setTexture('night') : setTexture('day')


    useEffect(() =>
    {
        const savedTexture = localStorage.getItem('texture') ?? "day"
        setTexture(savedTexture)
    }, [])

    useEffect(() =>
    {
        localStorage.setItem('texture', texture)
    }, [texture])


    useFrame((state, delta) => {

        let fovFactor = state.camera.position.distanceTo(origin) / 3.5
        state.camera.fov = Math.min(50, Math.max(fovFactor * fov, 20))
        state.camera.updateProjectionMatrix()
        
        lerpedFov = THREE.MathUtils.lerp(lerpedFov, state.camera.fov, 10 * delta)
        state.camera.fov = lerpedFov
       
        //set panning limits
        orbitRef.current.target.x = Math.max(-1.5, Math.min(orbitRef.current.target.x, 1.5))
        orbitRef.current.target.y = Math.max(-0.8, Math.min(orbitRef.current.target.y, 1))
        orbitRef.current.target.z = Math.max(-1.5, Math.min(orbitRef.current.target.z, 1.5))

        //change near setting based on distance from origin to remove clipped wall objects
        state.camera.near = Math.pow(fovFactor, 1.8) * 1.6

    })
    

    //load model
    const { nodes } = useGLTF('./models/pitcher_scene.glb')

    return <>
        <Perf position="top-left"/>
        <OrbitControls makeDefault zoomToCursor
            ref = { orbitRef }
            target={[ 0, -0.4, 0]}
            maxDistance={ 4 }
            maxPolarAngle={ Math.PI - 1.45 }
            zoomSpeed = { 0.7 }    
            panSpeed = {0.8}
        />

        <Stage texture={texture}/>
        <Center >
            <Room model={ nodes.matte } texture={texture}/>
            <Tabletop glossyObjects={ nodes.glossy } tabletop={nodes.tabletop} pitcher={nodes.pitcher} texture={texture}/>
            <Mirror frame={ nodes.mirrorFrame } glass={ nodes.mirrorGlass } texture={texture} />
            <Floor texture={texture}/>
            <Painting model={ nodes.painting } click={click} texture={texture}/>
        </Center>
    </>
}