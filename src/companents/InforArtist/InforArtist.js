import clsx from 'clsx'
import { useRef } from 'react'

import styles from './InforArtist.module.scss'
import icons from '../../ultis/icon'
import { handleNumber } from '../../ultis/func'

function InforArtist({item, totalFollow}) {
    const { IoShuffle } = icons
    const imgElement = useRef()

    function handleHover() {
        imgElement?.current?.classList?.add('scaleInCenter')
        imgElement.current.classList.remove('scaleOutCenter')
    }

    function handleLeave() {
        imgElement?.current?.classList?.remove('scaleInCenter')
        imgElement.current.classList.add('scaleOutCenter')
    }

    return (
        <div className={clsx(styles.container)}>
            <div 
                className={clsx(styles.wrapImg)}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
            >
                <img 
                    className={clsx(styles.img)} 
                    src={item.thumbnail}
                    ref={imgElement}
                ></img>

                <span className={clsx(styles.randomIcon)}><IoShuffle size={30}/></span>
            </div>

            <div className={clsx(styles.content)}>
                <span className={clsx(styles.artistText)}>Nghệ sĩ</span>
                <a className={clsx(styles.artistName)}>{item.name}</a>
                <span className={clsx(styles.care)}>{handleNumber(totalFollow)}</span>
            </div>
        </div>
    )
}

export default InforArtist