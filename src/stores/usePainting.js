import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) => 
{
    return {
        textures: 'day',

        setTextures: () =>
        {
            set((state) => {
                if(state.textures === 'day')
                    return{ textures: 'night'}
                return { textures: 'day' }
            })
        }
    }
}))