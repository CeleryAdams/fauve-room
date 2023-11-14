import { Center, OrbitControls, useGLTF} from '@react-three/drei'
import * as THREE from 'three'
import { Perf } from 'r3f-perf'
import { Suspense, useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import Stage from './Stage.jsx'
import Room from './Room.jsx'
import Tabletop from './Tabletop.jsx'
import Mirror from './Mirror.jsx'
import Floor from './Floor.jsx'
import Painting from './Painting.jsx'


export default function World()
{
    //load model
    const { nodes } = useGLTF('./models/pitcher_scene.glb')


    //set texture as day, or retrieve setting from local storage if available
    const [texture, setTexture] = useState(() => {
        const savedTexture = localStorage.getItem('texture') || 'day';
        return savedTexture;
      });


    useEffect(() =>
    {
        const savedTexture = localStorage.getItem('texture') ?? "day"
        setTexture(savedTexture)
    }, [])


    useEffect(() =>
    {
        localStorage.setItem('texture', texture)
    }, [texture])


    //set initial painting state based on scene texture
    const [paintingState, setPainting] = useState(texture)

    
    const toggleTexture = () => 
    {
        //if painting and scene are the same texture, do nothing
        if (paintingState === texture ) return

        //change scene texture
        texture === 'day' ? setTexture('night') : setTexture('day')
    }


    //update camera settings based on distance from origin
    const fov = 42
    let lerpedFov = fov
    const [ origin ] = useState(() => new THREE.Vector3(0, 0, 0))
    const orbitRef = useRef()


    useFrame((state, delta) => {

        //increase fov as camera moves towards the outside of the room
        let fovFactor = state.camera.position.distanceTo(origin) / 3.5
        state.camera.fov = Math.min(45, Math.max(fovFactor * fov, 20))
        state.camera.updateProjectionMatrix()
        
        //smooth fov adjustment
        lerpedFov = THREE.MathUtils.lerp(lerpedFov, state.camera.fov, 10 * delta)
        state.camera.fov = lerpedFov
       
        //set panning limits
        orbitRef.current.target.x = Math.max(-1.5, Math.min(orbitRef.current.target.x, 1.5))
        orbitRef.current.target.y = Math.max(-0.8, Math.min(orbitRef.current.target.y, 1))
        orbitRef.current.target.z = Math.max(-1.5, Math.min(orbitRef.current.target.z, 1.5))

        //change near setting based on distance from origin to remove clipped wall objects
        state.camera.near = Math.pow(fovFactor, 1.9) * 1.6


        // lerp to target view, timeout to avoid janky initial movement
        // if (!userInteracted && targetView)
        // {
        //     setTimeout(() => 
        //     {
        //         lerpToView(targetView, state, delta)
        //         if (state.camera.position.distanceTo(targetView.cameraPosition) < 0.05 &&
        //             orbitRef.current.target.distanceTo(targetView.orbitTarget) < 0.05 &&
        //             state.camera.quaternion.angleTo(targetQuaternion) < 0.05)
        //         {
        //             console.log('target set to null')
        //             setTargetView(null)
        //         }
        //     }, '18')
        // }

        // console.log(state.camera.position, state.camera.rotation, orbitRef.current.target)

    })


   
    //lerp to saved views
    const [targetView, setTargetView] = useState(null)
    const [userInteracted, setUserInteracted] = useState(false)

    let targetQuaternion = new THREE.Quaternion()
    const savedViews = 
    [
        {
            name: 'portrait',
            device: 'desktop',
            cameraPosition: new THREE.Vector3(1.45, -0.3, -2.9),
            cameraRotation: new THREE.Euler(3.12, 0.33, -3.14),
            orbitTarget: new THREE.Vector3(1.37, -0.27, -0.16),
        },
        {
            name: 'mirror',
            device: 'desktop',
            cameraPosition: new THREE.Vector3(-1.16, -0.2, 1.76),
            cameraRotation: new THREE.Euler(-0.05, -0.29, -0.01),
            orbitTarget: new THREE.Vector3(-0.6, -0.3, -0.15),
        },
        // {
        //     name: 'tabletop',
        //     device: 'desktop',
        //     cameraPosition: new THREE.Vector3(-1.3, -0.04, 1.57),
        //     cameraRotation: new THREE.Euler(-0.43, -0.65, -0.27),
        //     orbitTarget: new THREE.Vector3(-0.2, -0.65, 0.25),
        // },
        // {
        //     name: 'fish',
        //     device: 'desktop',
        //     cameraPosition: new THREE.Vector3(1.2, -0.15, 1.2),
        //     cameraRotation: new THREE.Euler(-0.58, 0.94, 0.49),
        //     orbitTarget: new THREE.Vector3(-0.24, -0.7, 0.36),
        // },
    ]
    
    //set targetview when target is clicked
    const setView = (selectedView) =>
    {
        for (const view of savedViews)
        {
            if (selectedView === view.name)
                {
                    setTargetView(view)
                }
        }
    }

    //lerp from current view to target view, to be called in useFrame
    const lerpToView = (view, state, delta) => {
        targetQuaternion.setFromEuler(view.cameraRotation)
        state.camera.position.lerp(view.cameraPosition, 0.5 * delta)
        state.camera.quaternion.slerp(targetQuaternion, 0.05 * delta)
        orbitRef.current.target.lerp(view.orbitTarget, 0.5 * delta)
    }

    //stop lerp if user interacts with camera (listen for clicks on screen)
    useEffect(() => 
    {
        if (targetView) 
        {
            setUserInteracted(false)
        }
    },[targetView])

    useEffect(() => {
        const handleClick = (event) => {
            event.stopPropagation()
            setUserInteracted(true);
        }
    
        document.addEventListener('click', handleClick);
    
        return () => {
            document.removeEventListener('click', handleClick);
        }
      }, [])


    return <>
        <Perf position="top-left"/>
        <OrbitControls makeDefault zoomToCursor
            ref = { orbitRef }
            target={[ 0, -0.4, 0]}
            maxDistance={ 3.8 }
            maxPolarAngle={ Math.PI - 1.45 }
            zoomSpeed = { 0.7 }    
            panSpeed = {0.8}
        />
        
        <Suspense>
            <Stage texture={texture}/>
        </Suspense>
        
        <Center >
            <Room model={ nodes.matte } texture={texture} setView={setView}/>
            <Tabletop glossyObjects={ nodes.glossy } tabletop={nodes.tabletop} pitcher={nodes.pitcher} texture={texture}/>
            <Mirror frame={ nodes.mirrorFrame } glass={ nodes.mirrorGlass } texture={texture} />
            <Floor texture={texture}/>
            <Painting model={ nodes.painting } setPainting = { setPainting } paintingState = { paintingState } toggleTexture={toggleTexture} texture={texture}/>
        </Center>
    </>
}