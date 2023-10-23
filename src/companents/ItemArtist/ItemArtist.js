import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

import styles from './ItemArtist.module.scss'
import icons from '../../ultis/icon'
import { Button } from '../Button'

function ItemArtist({item}) {
    const { IoShuffle, SlUserFollow } = icons
    const navigate = useNavigate()

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapImg)}>
                <img 
                    className={clsx(styles.img)} src={item.thumbnailM}
                    onClick={() => navigate(item.link)}
                ></img>
                <span className={clsx(styles.randomIcon)}><IoShuffle size={35}/></span>
            </div>

            <a href="" className={clsx(styles.artistName)}>{item.name.length < 30 ? item.name : `${item.name.slice(0, 27)}...`}</a>
            <span className={clsx(styles.care)}>{item.totalFollow < 1000 ? `${item.totalFollow} quan tâm` : `${Math.round(item.totalFollow / 1000)}K quan tâm`}</span>

            <div className={clsx(styles.btn)}>
                <Button item={{text: 'Quan tâm', icon: <SlUserFollow />}}></Button>
            </div>
        </div>
    )
}

export default ItemArtist