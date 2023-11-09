import clsx from 'clsx'
import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import styles from './CountrySong.module.scss'
import icons from '../../ultis/icon'
import { SongItem } from '../SongItem'
import { Button } from '../Button'
import * as actions from '../../store/action'

function CountrySong({ data }) {
    const { HiPlay } = icons
    const navigate = useNavigate()
    const [ country, setCountry ] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (data?.country === 'vn') {
            setCountry('Việt Nam')
        }
        else if (data?.country === 'us') {
            setCountry("US_UK")
        }
        else setCountry("K-POP")
    }, [data])

    function handleLink(link) {
        const path = link.split('.')[0]
        navigate(path)
    }

    function handleChooseSong(item, index) {
        dispatch(actions.setCurSongId(item.encodeId))
        dispatch(actions.setSkip(false))
        dispatch(actions.setRecentPlaylist(item))
    }

    function handlePlaySong() {
        dispatch(actions.setCurSongId(data.items[0].encodeId))
        dispatch(actions.setSkip(false))
        dispatch(actions.setRecentPlaylist(data.items[0]))
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapTitle)}>
                <h1 className={clsx(styles.title)}>{country}</h1>
                <span 
                    className={clsx(styles.wrapIcon)}
                    onClick={handlePlaySong}
                >
                    <HiPlay />
                </span>
            </div>

            <div className={clsx(styles.playlist)}>
                {data?.items?.filter((item, index) => index < 5).map((item, index) => (
                    <div 
                        onClick={() => handleChooseSong(item, index)}
                        key={index}
                    >
                        <SongItem item={item} zingchart index={index} nameSizeS zingchartM/>
                    </div>
                ))}
            </div>

            <div className={clsx(styles.wrapBtn)}>
                <div 
                    className={clsx(styles.btnAdd)}
                    onClick={() => handleLink(data.link)}
                >
                        <Button item={{text: 'Xem tất cả'}}/>
                </div>
            </div>
        </div>
    )
}

export default memo(CountrySong)