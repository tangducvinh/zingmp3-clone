import { Audio } from 'react-loader-spinner'

function AudioSpinner() {
    return (
        <Audio
            height="25"
            width="25"
            color="#ffff"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    )
}

export default AudioSpinner