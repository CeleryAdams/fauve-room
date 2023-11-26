import { useState } from "react"

export default function Jug({setImage})
{
    const [opacity, setOpacity] = useState(1.0)
    const [overlay, setOverlay] = useState(false)

    return <>
        <div className='jug-container'
            onPointerEnter={()=>{
                setOpacity(0.5)
                setOverlay(true)
            }}
            onPointerLeave={()=>{
                setOpacity(1.0)
                setOverlay(false)
            }}
        >
            <div className='jug-text' style={{opacity: opacity}}>
                Atelier I, Georges Braque 1949
            </div>
            <img 
                className = 'jug-painting' 
                style={{opacity: opacity}}
                src={'./images/braque.jpg'} 
                onClick={(event)=>
                    {
                        setImage(null)
                        event.stopPropagation()
                    }}
            />
            { overlay && <div className='close'>╳</div>}
        </div>
    </>
}