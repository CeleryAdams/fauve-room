import { useControls } from 'leva'
import { useRef } from 'react'
import * as THREE from 'three'
import { Environment, useHelper } from '@react-three/drei'


export default function Stage()
{
    // debug light
    const { lightPosition, lightIntensity, lightColor } = useControls({
        lightPosition:
        {
            value: {x: 3.37, y: 1, z: 0},
            step: 0.01
        },
        lightIntensity:
        {
            value: 15,
            step: 0.1
        },
        lightColor: '#e2dccb',
    })


    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    
    return <>
        <Environment
            background = {'only'}
            files={[
                './environment/px.jpg',
                './environment/nx.jpg',
                './environment/py.jpg',
                './environment/ny.jpg',
                './environment/pz.jpg',
                './environment/nz.jpg',
            ]}
        />
    
        <directionalLight 
            color={lightColor} 
            intensity= { lightIntensity } 
            ref={ directionalLight } 
            position = {[ lightPosition.x, lightPosition.y, lightPosition.z ]}
        />  
    </>
}