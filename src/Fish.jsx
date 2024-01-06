import { useState } from "react"

export default function Fish({setImage})
{
    const [opacity, setOpacity] = useState(1.0)
    const [overlay, setOverlay] = useState(false)

    return <>
        <div className='fish-container'
            onPointerEnter={()=>{
                setOpacity(0.5)
                setOverlay(true)
            }}
            onPointerLeave={()=>{
                setOpacity(1.0)
                setOverlay(false)
            }}
        >
            {/* <div className='fish-text' style={{opacity: opacity}}>
                Fish in a Dish, Pierre Bonnard 1921
            </div> */}
            <img 
                className = 'fish-painting' 
                style={{opacity: opacity}}
                src={'./images/bonnard.jpg'} 
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