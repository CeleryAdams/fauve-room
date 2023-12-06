import { Center, OrbitControls, useGLTF} from '@react-three/drei'
import * as THREE from 'three'
import { Suspense, useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import Stage from './Stage.jsx'
import Room from './Room.jsx'
import Tabletop from './Tabletop.jsx'
import Mirror from './Mirror.jsx'
import Floor from './Floor.jsx'
import Painting from './Painting.jsx'
// import { useControls } from 'leva'


export default function World( {image, setImage} )
{
    //load models
    const { nodes } = useGLTF('./models/pitcher_scene.glb')
    const tableclothProxy = useGLTF('./models/tablecloth-proxy.glb')
    const proxyMesh = tableclothProxy.nodes.tableclothProxy


    //set texture as day, or retrieve setting from local storage if available
    const [texture, setTexture] = useState(() => {
        const savedTexture = localStorage.getItem('texture') || 'day'
        return savedTexture
      })

    
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
        lerpedFov = THREE.MathUtils.lerp(lerpedFov, state.camera.fov, 5 * delta)
        state.camera.fov = lerpedFov
       
        //set panning limits
        orbitRef.current.target.x = Math.max(-1.5, Math.min(orbitRef.current.target.x, 1.5))
        orbitRef.current.target.y = Math.max(-0.8, Math.min(orbitRef.current.target.y, 1))
        orbitRef.current.target.z = Math.max(-1.5, Math.min(orbitRef.current.target.z, 1.5))

        //change near setting based on distance from origin to remove clipped wall objects
        state.camera.near = Math.pow(fovFactor, 1.9) * 1.6


        // lerp to target view, timeout to reduce janky initial movement
        if (!userInteracted && targetView)
        {
            setTimeout(() => 
            {
                lerpToView(targetView, state, delta)
                if (state.camera.position.distanceTo(targetView.cameraPosition) < 0.05 &&
                    orbitRef.current.target.distanceTo(targetView.orbitTarget) < 0.05 &&
                    state.camera.quaternion.angleTo(targetQuaternion) < 0.05)
                {
                    console.log('target set to null')
                    setTargetView(null)
                }
            }, 16)
        }

    })


   
    //lerp to saved views
    const [targetView, setTargetView] = useState(null)
    const [userInteracted, setUserInteracted] = useState(false)

    let targetQuaternion = new THREE.Quaternion()
    const savedViews = 
    [
        {
            name: 'portrait',
            cameraPosition: new THREE.Vector3(1.45, -0.3, -2.9),
            cameraRotation: new THREE.Euler(3.12, 0.33, -3.14),
            orbitTarget: new THREE.Vector3(1.37, -0.27, -0.16),
        },
        {
            name: 'mirror',
            cameraPosition: new THREE.Vector3(-1.16, -0.2, 1.76),
            cameraRotation: new THREE.Euler(-0.05, -0.29, -0.01),
            orbitTarget: new THREE.Vector3(-0.6, -0.3, -0.15),
        },
        {
            name: 'portrait-vertical',
            cameraPosition: new THREE.Vector3(1.26, -0.32, -2.63),
            cameraRotation: new THREE.Euler(3.13, 0.03, -3.14),
            orbitTarget: new THREE.Vector3(1.2, -0.3, -0.16),
        },
        {
            name: 'mirror-vertical',
            cameraPosition: new THREE.Vector3(-1, -0.17, 2.58),
            cameraRotation: new THREE.Euler(-0.08, -0.2, -0.2),
            orbitTarget: new THREE.Vector3(-0.43, -0.38, -0.13),
        },

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
            setUserInteracted(true)
        }
    
        document.addEventListener('click', handleClick);
        document.addEventListener('touchstart', handleClick);
        document.addEventListener('touchmove', handleClick);
    
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('touchstart', handleClick);
            document.removeEventListener('touchmove', handleClick);
        }
    }, [])

    
    //detect touch device
    // const isTouchDevice = () => {
    //     return (('ontouchstart' in window) ||
    //        (navigator.maxTouchPoints > 0) ||
    //        (navigator.msMaxTouchPoints > 0))
    //   }

    //detect vertical orientation
    const isVerticalOrientation = () => {
        return window.innerHeight > window.innerWidth
    }

    // const { meshPosition, meshScale, meshRotation } = useControls({
    //     meshPosition:
    //     {
    //         value: [0.3,0.8,0.3],
    //         step: 0.01
    //     },
    //     meshScale:
    //     {
    //         value: [0.1,0.01,0.3],
    //         step: 0.01
    //     },
    //     meshRotation:
    //     {
    //         value: [0,0,0],
    //         step: 0.01
    //     },
        
    // })

    

    return <>
        {/* <Perf position="top-left"/> */}
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
            {/* portrait proxy */}
            <mesh 
                position={[1.28, 1.43, 2.75]} 
                scale={[0.48, 0.6, 0.1]}
                onPointerEnter={() => document.body.style.cursor = 'pointer'}
                onPointerLeave={() => document.body.style.cursor = 'default'}
                onClick={() => 
                    {
                        if (isVerticalOrientation())
                        {
                            setView('portrait-vertical')
                        }
                        else setView('portrait')
                    }}
            >
                <boxGeometry />
                <meshBasicMaterial visible={false}/>
            </mesh>
                
            {/* mirror proxy */}
            <mesh 
                position={[0.05, 1.23, -2.67]} 
                scale={[0.72, 0.07, 0.63]}
                rotation={[Math.PI/2, 0, 0]}
                onPointerEnter={() => document.body.style.cursor = 'pointer'}
                onPointerLeave={() => document.body.style.cursor = 'default'}
                onClick={() => 
                    {
                        if (isVerticalOrientation())
                        {
                            setView('mirror-vertical')
                        }
                        else setView('mirror')
                    }}
            >
                <cylinderGeometry args={[1, 1, 1, 8]}/>
                <meshBasicMaterial visible={false}/>
            </mesh>

            {/* fish proxy */}
            <mesh
                 position={[0.3, 0.81, 0.34]} 
                 scale={[0.07, 0.03, 0.28]}
                 rotation-y={-0.36}
                 onPointerEnter={() => document.body.style.cursor = 'pointer'}
                 onPointerLeave={() => document.body.style.cursor = 'default'}
                 onClick={(event) => 
                    {
                        (image !== 'fish') ? setImage('fish') : setImage(null)
                        event.stopPropagation()
                    }}
            >
                <boxGeometry />
                <meshBasicMaterial visible={false}/>
            </mesh>

            {/* tablecloth proxy */}
            <mesh
                 geometry={ proxyMesh.geometry } 
                 position={ proxyMesh.position  }
                 onPointerEnter={() => document.body.style.cursor = 'pointer'}
                 onPointerLeave={() => document.body.style.cursor = 'default'}
                 onClick={(event) => 
                    {
                        (image !== 'dance') ? setImage('dance') : setImage(null)
                        event.stopPropagation()
                    }}
            >
                <meshBasicMaterial visible={false}/>
            </mesh>

            {/* jug proxy */}
            <mesh
                 position={[0.12, 0.99, -0.16]} 
                 scale={[0.12, 0.28, 0.12]}
                 onPointerEnter={() => document.body.style.cursor = 'pointer'}
                 onPointerLeave={() => document.body.style.cursor = 'default'}
                 onClick={(event) => 
                    {
                        (image !== 'jug') ? setImage('jug') : setImage(null)
                        event.stopPropagation()
                    }}
            >
                <cylinderGeometry args={[1, 1, 1, 8]}/>
                <meshBasicMaterial visible={false}/>
            </mesh>


            <Room model={ nodes.matte } texture={texture}/>
            <Tabletop 
                glossyObjects={ nodes.glossy } 
                tabletop={nodes.tabletop} 
                pitcher={nodes.pitcher} 
                texture={texture}
            />
            <Mirror 
                frame={ nodes.mirrorFrame } 
                glass={ nodes.mirrorGlass } 
                texture={texture} 
            />
            <Floor texture={texture}/>
            <Painting 
                model={ nodes.painting } 
                setPainting = { setPainting } 
                paintingState = { paintingState } 
                toggleTexture={toggleTexture} 
                texture={texture}
                view={targetView}
            />
        </Center>
    </>
}