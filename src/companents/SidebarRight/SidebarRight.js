import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './SidebarRight.module.scss'
import { Button } from '../Button'
import { ButtonAudio } from '../ButtonAudio'
import icons from '../../ultis/icon'
import * as apis from '../../apis'
import { InforSong } from '../InforSong'
import * as actions from '../../store/action'
import { Mutating } from '../Spinner'

function SidebarRight() {
    const { IoMdTime, SlOptions } = icons
    const [ isActive, setIsActive ] = useState(1)
    const { curSongId, curPlaylistId, recentPlaylist, dataZingchart, inforCurrent, dataNextSong } = useSelector(state => state.music)
    const { isPlaying, sidebarRight, isChangePlaylist} = useSelector(state => state.play)
    const [ titlePlaylist, setTiltePlaylist ] = useState('')
    const dispatch = useDispatch()

    async function featchDataRankSong() {
        const response = await apis.getZingchart()
        dispatch(actions.setDataNextSong(response.data.data.RTChart.items))
    }

    useEffect(() => {
        if (dataNextSong.length === 0) {
            featchDataRankSong()
        }
    }, [dataNextSong])

    useEffect(() => {
        setIsActive(1)
    }, [inforCurrent]) 

    async function handleChoseSong(item) {
        dispatch(actions.setCurrent(item.encodeId))

        // dispatch(actions.setSkip(false))
    }

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

            {isActive === 1 && 
                <div className={clsx(styles.wrapPlaylist)}>
                    {(dataNextSong === null || inforCurrent === null) && 
                        <div className={clsx(styles.loading)}><Mutating /></div>
                    }

                    <div 
                        className={clsx(styles.wrapInforSong, styles.activeCurSong)}
                        onClick={() => dispatch(actions.play(!isPlaying))}
                    > 
                        <InforSong 
                            item={inforCurrent} 
                            sizeM 
                            play={!isPlaying} 
                            playing={isPlaying}
                        />
                    </div>

                    <div className={clsx(styles.playListTitle)}>
                        <span className={clsx(styles.nextText)}>Tiếp theo</span>
                        <p className={clsx(styles.wrapSourseText)}>
                            <span className={clsx(styles.fromText)}>Từ playlist </span>
                            {curPlaylistId ?
                                <span 
                                    className={clsx(styles.sourseText)}
                                >
                                    {titlePlaylist?.length < 30 ? titlePlaylist : `${titlePlaylist?.slice(0,30)}...`}
                                </span>
                                :
                                <span 
                                    className={clsx(styles.sourseText)}
                                >
                                    Bản xếp hạng nhạc mới
                                </span>
                            }
                        </p>
                    </div>

                    <div className={clsx(styles.playListContent)}>
                        {dataNextSong?.map((item, index) => (
                            <div 
                                className={clsx(styles.wrapInforSong)}
                                key={item.encodeId}
                                onClick={() => handleChoseSong(item)}
                            > 
                                <InforSong item={item} sizeM play/>
                            </div>
                        ))}
                    </div>
                </div>   
            }

            {isActive === 2 && 
                <div className={clsx(styles.wrapPlaylist)}>
                    <div className={clsx(styles.playListContent)}>
                        {recentPlaylist?.map((item, index) => (
                            <div 
                                className={clsx(styles.wrapInforSong)}
                                key={item.encodeId}
                                onClick={() => handleChoseSong(item)}
                            > 
                                <InforSong item={item} sizeM play/>
                            </div>
                        ))}
                    </div>
                </div>
            }

            <div className={clsx(styles.wrapBottom)}></div>

        </div>
    )
}

export default SidebarRight