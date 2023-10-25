import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

import styles from './ItemArtist.module.scss'
import icons from '../../ultis/icon'
import { Button } from '../Button'
import { handleNumber } from '../../ultis/func'

function ItemArtist({item}) {
    const { IoShuffle, SlUserFollow } = icons
    const navigate = useNavigate()
    const imgElement = useRef()

    function handleHover() {
        imgElement.current.classList.add('scaleInCenter')
        imgElement.current.classList.remove('scaleOutCenter')
    }

    function handleLeave() {
        imgElement.current.classList.add('scaleOutCenter')
        imgElement.current.classList.remove('scaleInCenter')
    }

    return (
        <div className={clsx(styles.container)}>
            <div 
                className={clsx(styles.wrapImg)}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
            >
                <img 
                    className={clsx(styles.img)} src={item.thumbnailM}
                    onClick={() => navigate(item.link)}
                    ref={imgElement}
                ></img>
                <span className={clsx(styles.randomIcon)}><IoShuffle size={35}/></span>
            </div>

            <a href="" className={clsx(styles.artistName)}>{item.name.length < 30 ? item.name : `${item.name.slice(0, 27)}...`}</a>
            <span className={clsx(styles.care)}>{handleNumber(item.totalFollow)}</span>

            <div className={clsx(styles.btn)}>
                <Button item={{text: 'Quan tâm', icon: <SlUserFollow />}}></Button>
            </div>
        </div>
    )
}

export default ItemArtist