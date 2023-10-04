import { MutatingDots } from 'react-loader-spinner'
import { memo } from 'react'

function Mutating() {
    return (
        <MutatingDots 
            height="100"
            width="100"
            color="#fff"
            secondaryColor= '#fff'
            radius='8'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
}

export default memo(Mutating)