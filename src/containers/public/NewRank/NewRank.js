import clsx from 'clsx'
import { useSelector } from 'react-redux'

import styles from './NewRank.module.scss'
import icons from '../../../ultis/icon'
import { RankSongPlaylist } from '../../../companents/RankSongPlaylist'

function NewRank() {
    const { dataZingchart } = useSelector(state => state.music)
    const { HiPlay } = icons

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapTitle)}>
                <h1 className={clsx(styles.title)}>BXH Nhạc Mới</h1>
                <div className={clsx(styles.btnPlay)}> <HiPlay size={25}/></div>    
            </div> 

            <div className={clsx(styles.playlist)}>
                <RankSongPlaylist data={dataZingchart?.RTChart?.items}/>
            </div>
        </div>
    )
}

export default NewRank