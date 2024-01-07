import { useState } from "react"

export default function Table({setImage})
{
    const [opacity, setOpacity] = useState(1.0)
    const [overlay, setOverlay] = useState(false)

    return <>
        <div className='table-container'
            onPointerEnter={()=>{
                setOpacity(0.5)
                setOverlay(true)
            }}
            onPointerLeave={()=>{
                setOpacity(1.0)
                setOverlay(false)
            }}
        >
            <img 
                className = 'table-painting' 
                style={{opacity: opacity}}
                src={'./images/fruit-basket.jpg'} 
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