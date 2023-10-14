import clsx from 'clsx'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import styles from './SidebarRight.module.scss'
import { Button } from '../Button'
import { ButtonAudio } from '../ButtonAudio'
import icons from '../../ultis/icon'
import * as apis from '../../apis'
import { InforSong } from '../InforSong'

function SidebarRight() {
    const { IoMdTime, SlOptions } = icons
    const [ isActive, setIsActive ] = useState(1)
    const [ playlistData, setPlaylistData ] = useState()
    const { sidebarRight, isPlaying, isChangePlaylist } = useSelector(state => state.play)
    const { curSongId, curPlaylistId } = useSelector(state => state.music)
    const [ curSongData, setCurSongData ]  = useState()

    useEffect(() => {
        async function fecthPlaylist() {
            const response = await apis.getDetailtPlaylist(curPlaylistId)
            setPlaylistData(response?.data?.data)
        }

        if (isChangePlaylist) fecthPlaylist()
    }, [curPlaylistId, isChangePlaylist])

    useEffect(() => {
        async function fecthDetailSong() {
            const response = await apis.getDetailSong(curSongId)
            setCurSongData(response?.data?.data)
        }

        fecthDetailSong()
    }, [curSongId]) 

    return (
        <div className={clsx(styles.container, {[styles.slideLeft]: sidebarRight === true , [styles.slideRight]: sidebarRight === false})}>
            <div className={clsx(styles.wrapTitle)}>
                <div className={clsx(styles.wrapOptions)}>
                    <span 
                        className={clsx(styles.btnOption, {[styles.active]: isActive === 1})}
                        onClick={() => setIsActive(1)}
                    >
                        <Button item={{text: 'Danh sách phát'}} sizeM></Button>
                    </span>
                    <span 
                        className={clsx(styles.btnOption, {[styles.active]: isActive === 2})}
                        onClick={() => setIsActive(2)}
                    >
                        <Button item={{text: 'Nghe gần đây'}} sizeM></Button>
                    </span>
                </div>

                <div className={clsx(styles.btnTimer)}>
                    <ButtonAudio item={{icon: <IoMdTime />, content: 'Hẹn giờ dừng phát nhạc'}} ></ButtonAudio>
                </div>

                <div className={clsx(styles.btnAdd)}>
                    <ButtonAudio item={{icon: <SlOptions />, content: 'Khác'}} ></ButtonAudio>
                </div>
            </div>

            <div className={clsx(styles.wrapPlaylist)}>
                <div className={clsx(styles.wrapInforSong, styles.activeCurSong)}> 
                    <InforSong 
                        item={curSongData} 
                        sizeM 
                        play 
                        playing={isPlaying}
                    />
                </div>

                <div className={clsx(styles.playListTitle)}>
                    <span className={clsx(styles.nextText)}>Tiếp theo</span>
                    <p className={clsx(styles.wrapSourseText)}>
                        <span className={clsx(styles.fromText)}>Từ playlist </span>
                        <span className={clsx(styles.sourseText)}>{playlistData?.title}</span>
                    </p>
                </div>

                <div className={clsx(styles.playListContent)}>
                    {playlistData?.song?.items?.map(item => (
                        <div 
                            className={clsx(styles.wrapInforSong)}
                            key={item.encodeId}
                        > 
                            <InforSong item={item} sizeM play />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default SidebarRight