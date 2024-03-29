import { useState } from 'react'
import CloseIcon from '/images/close.svg'

export default function PaintingOverlay({setImage, image})
{
    const [opacity, setOpacity] = useState(1.0)
    const [overlay, setOverlay] = useState(false)

    const closeImage = (event)=>
    {
        setImage(null)
        event.stopPropagation()
    }

    const handlePointerEnter = () =>
    {
        if (!window.matchMedia('(hover: none)').matches)
        {
            setOpacity(0.5)
            setOverlay(true)
        }
    }


    return <>
        <div className={`${image}-container`}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={()=>{
                setOpacity(1.0)
                setOverlay(false)
            }}
        >

            <img 
                className={`${image}-painting`}
                style={{opacity: opacity}}
                src={`./images/${image}.jpg`} 
                onClick={closeImage}
            />
            <img
                className='close-icon'
                src={CloseIcon}
                onClick={closeImage}
            />
            { overlay && <div className='close'>close</div>}
        </div>
    </>
}