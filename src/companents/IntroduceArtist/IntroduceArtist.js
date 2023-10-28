import clsx from 'clsx'
import { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './IntroduceArtist.module.scss'
import icons from '../../ultis/icon'
import { Button } from '../Button'
import * as actions from '../../store/action'

function IntroduceArtist({data}) {
    const { HiPlay, SlUserFollow, HiPause } = icons 
    const dispatch = useDispatch()
    const [ isPlay, setIsPlay ] = useState(false)
    const { isPlaying } = useSelector(state => state.play)
    const { curSongId } = useSelector(state => state.music)

    function handlePlaySong() {
        const dataSong = data?.sections.find(item => item.sectionId === "aSongs").items[0]
        if(data?.sections?.find(item => item.sectionId === 'aSongs')?.items?.filter(item => item.encodeId === curSongId)[0]?.encodeId === undefined) {
            dispatch(actions.setCurSongId(dataSong.encodeId))
            dispatch(actions.play(true))
            dispatch(actions.setRecentPlaylist(dataSong))
            return
        }
        dispatch(actions.play(!isPlaying))
    }

    useEffect(() => {
        if(data?.sections?.find(item => item => item.sectionId === 'aSongs')?.items?.filter(item => item.encodeId === curSongId)[0]?.encodeId === undefined) {
            setIsPlay(false)
        } else {
            setIsPlay(isPlaying)
        }
    }, [isPlaying, curSongId, data])

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapIntroduce)}>
                <img className={clsx(styles.img)} src={data?.thumbnail}></img>

                <div className={clsx(styles.wrapContent)}>
                    <div className={clsx(styles.wrapTop)}>
                        <h1 className={clsx(styles.artistName)}>{data?.name}</h1>
                        <span 
                            className={clsx(styles.wrapIcon)}
                            onClick={handlePlaySong}
                        >
                            {isPlay ? <HiPause size={25} color={'white'}/> : <HiPlay size={25} color={'white'}/>}
                        </span>
                    </div>

                    <div className={clsx(styles.wrapBottom)}>
                        <span className={clsx(styles.care)}>{`${Number(data?.totalFollow.toFixed(1)).toLocaleString()} người quan tâm`}</span>
                        <div className={clsx(styles.careBtn)}>
                            <Button sizeM item={{text: 'QUAN TÂM', icon: <SlUserFollow />}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(IntroduceArtist)