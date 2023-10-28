import { useControls } from 'leva'
import { useRef } from 'react'
import * as THREE from 'three'
import { Environment, useHelper } from '@react-three/drei'


export default function Stage( {texture} )
{
    // debug light
    // const { lightPosition, lightIntensity, lightColor } = useControls({

    //     lightPosition:
    //     {
    //         value: [ 3.37, 1, 0 ],
    //         step: 0.1
    //     },

    //     lightIntensity:
    //     {
    //         value: 15,
    //         step: 0.1
    //     },
    //     lightColor: '#e2dccb',
    // })


    // const directionalLight = useRef()
    // useHelper(directionalLight, THREE.DirectionalLightHelper, 1)


    const dayEnvironment = [
        './environment/day/px.jpg',
        './environment/day/nx.jpg',
        './environment/day/py.jpg',
        './environment/day/ny.jpg',
        './environment/day/pz.jpg',
        './environment/day/nz.jpg',
    ]

    const nightEnvironment = [
        './environment/night/px_night.jpg',
        './environment/night/nx_night.jpg',
        './environment/night/py_night.jpg',
        './environment/night/ny_night.jpg',
        './environment/night/pz_night.jpg',
        './environment/night/nz_night.jpg',
    ]


    
    return <>
        <Environment
            background = {'only'}
            files={ (texture === "day") ? dayEnvironment : nightEnvironment }
        />
    
        <directionalLight 
            color={(texture === "day") ? '#e2dccb' : '#3c2d52'} 
            intensity= { (texture === "day") ? 15 : 12 } 
            position = {(texture === "day") ? [ 3.37, 1, 0 ] : [3.4, 0.3, 0]}
        />  

        {/* debug light */}
        {/* <directionalLight 
            color={lightColor} 
            intensity= { lightIntensity } 
            ref={ directionalLight } 
            position = {lightPosition}
        />   */}


    </>
}