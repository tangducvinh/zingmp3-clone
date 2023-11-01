import clsx from 'clsx'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './ZingchartSongs.module.scss'
import { SongItem } from '../SongItem'
import * as actions from '../../store/action'

function ZingchartSongs() {
    const { id } = useParams()
    const { dataZingchart } = useSelector(state => state.music)
    const [ dataPlaylist, setDataPlaylist ] = useState()
    const ref = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        if (id == 'IWZ9Z08I') setDataPlaylist(dataZingchart?.weekChart?.vn?.items)
        else if (id == 'IWZ9Z0BW') setDataPlaylist(dataZingchart?.weekChart?.us?.items)
        else setDataPlaylist(dataZingchart?.weekChart?.korea?.items)
    }, [dataZingchart, id])

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [])

    function handleChooseSong(item, index) {
        dispatch(actions.setCurSongId(item.encodeId, index))
        dispatch(actions.play(true))
        dispatch(actions.setRecentPlaylist(item))
    }

    return (
        <div className={clsx(styles.container)}>
            <div 
                className={clsx(styles.playlist)} ref={ref}
            >
                {dataPlaylist?.map((item, index) => (
                    <div
                        onClick={() => handleChooseSong(item, index)}
                        key={index}
                    >
                        <SongItem item={item} index={index} zingchart/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ZingchartSongs