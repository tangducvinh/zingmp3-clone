import clsx from 'clsx'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './ZingchartSongs.module.scss'
import { SongItem } from '../SongItem'

function ZingchartSongs() {
    const { id } = useParams()
    const { dataZingchart, dataFavoritePlaylist } = useSelector(state => state.music)
    const [ dataPlaylist, setDataPlaylist ] = useState()
    const ref = useRef()

    useEffect(() => {
        if (id == 'IWZ9Z08I') setDataPlaylist(dataZingchart?.weekChart?.vn?.items)
        else if (id == 'IWZ9Z0BW') setDataPlaylist(dataZingchart?.weekChart?.us?.items)
        else setDataPlaylist(dataZingchart?.weekChart?.korea?.items)
    }, [dataZingchart, id])

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [])

    return (
        <div className={clsx(styles.container)}>
            <div 
                className={clsx(styles.playlist)} ref={ref}
            >
                {dataPlaylist?.map((item, index) => (
                    <div
                        key={index}
                    >
                        <SongItem favorite={dataFavoritePlaylist.some(el => el.encodeId === item.encodeId)} item={item} index={index} zingchart/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ZingchartSongs