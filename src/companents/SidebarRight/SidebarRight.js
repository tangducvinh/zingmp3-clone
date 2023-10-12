import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styles from './SidebarRight.module.scss'
import { Button } from '../Button'
import { ButtonAudio } from '../ButtonAudio'
import icons from '../../ultis/icon'
import * as apis from '../../apis'
import { InforSong } from '../InforSong'

function SidebarRight() {
    const { IoMdTime, SlOptions } = icons
    const [ isActive, setIsActive ] = useState(1)
    const { pid } = useParams()
    const [ playlistData, setPlaylistData ] = useState()

    useEffect(() => {
        async function fecthPlaylist() {
            const response = await apis.getDetailtPlaylist(pid)
            setPlaylistData(response?.data?.data)
        }

        fecthPlaylist()
    }, [pid])

    return (
        <div className={clsx(styles.container)}>
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