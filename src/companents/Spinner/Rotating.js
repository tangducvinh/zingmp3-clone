import { RotatingLines } from 'react-loader-spinner'

function Rotating() {
    return (
        <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="20"
            visible={true}
        />
    )
}

export default Rotating