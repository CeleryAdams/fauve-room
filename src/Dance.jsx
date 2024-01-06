import { useState } from "react"

export default function Dance({setImage})
{
    const [opacity, setOpacity] = useState(1.0)
    const [overlay, setOverlay] = useState(false)

    return <>
        <div className='dance-container'
            onPointerEnter={()=>{
                setOpacity(0.5)
                setOverlay(true)
            }}
            onPointerLeave={()=>{
                setOpacity(1.0)
                setOverlay(false)
            }}
        >
            {/* <div className='dance-text' style={{opacity: opacity}}>
                Still Life With 'Dance', Henri Matisse 1909
            </div> */}
            <img 
                className = 'dance-painting' 
                style={{opacity: opacity}}
                src={'./images/matisse.jpg'} 
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