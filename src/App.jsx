import { Canvas } from '@react-three/fiber'
import World from './World.jsx'
import { Suspense, useState, useEffect } from 'react'
import { useProgress, Html, Loader, Preload } from "@react-three/drei"
import { Perf } from 'r3f-perf'
import PaintingOverlay from './PaintingOverlay.jsx'
import CloseIcon from '/images/close.svg'


export default function App()
{
    const [ image, setImage ] = useState(null)
    const [ showInfo, setShowInfo ] = useState(false)

    const [opacity, setOpacity] = useState(1.0)


    useEffect(()=>
    {
        const handleKeyDown = (event) => 
        {
            if (event.key === 'Escape')
            {
                setImage(null)
                setShowInfo(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])


    return <>
        <Canvas 
        flat
        camera ={{
            near: 0.3,
            far: 200,
            position: [ 1.7, -0.25, 2.7 ],
        }}
        >
        {/* <Perf /> */}
        <Suspense>
            <World image = { image } setImage={ setImage }/>
            <Preload all/>
        </Suspense>
        </Canvas>


        <div className='painting-overlay'>
            { image && <PaintingOverlay setImage={ setImage } image={ image } />}
        </div>

        <button className='info-button' onClick={()=>setShowInfo(!showInfo)}>i</button>
        {showInfo && 
            <div className='info-overlay'
                style={{opacity: opacity}}
            >
                <ul>
                    <li><span className='bold'>jug</span> from Georges Braque, <span className='italic'>Atelier I</span> (1949) </li>
                    <li><span className='bold'>fish</span> from Pierre Bonnard, <span className='italic'>Fish in a Dish</span> (1921) </li>
                    <li><span className='bold'>tablecloth</span> from Henri Matisse, <span className='italic'>Dance</span> (1909) </li>
                    <li><span className='bold'>table</span> from Pierre Bonnard, <span className='italic'>Fruit Basket</span> (1929) </li>
                    <li><span className='bold'>portrait</span> from Henri Matisse, <span className='italic'>Portrait With Pink and Blue</span> (1936) </li>
                </ul>

                <img
                className='info-close-icon'
                    src={CloseIcon}
                    onPointerEnter={()=>{
                        setOpacity(0.75)
                    }}
                    onPointerLeave={()=>{
                        setOpacity(1.0)
                    }}
                    onClick={()=>
                        {
                            setShowInfo(false)
                            setOpacity(1.0)
                        }
                    }
                />
            </div>
    
        }
        <Loader 
            containerStyles={{background: `url('./images/wallpaper-bg.jpg'), repeat`}}
            innerStyles={{width: '80vw', height: 3.5, background: '#312b5c'}}
            barStyles={{height: 3.5, background: '#a178f5'}}
            dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
            dataStyles={{fontSize: 'max(2vw, 16pt)', fontFamily: 'Alegreya, serif', color: '#a178f5', marginTop: '0.5em'}}
        />
    </>
}