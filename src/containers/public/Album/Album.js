import clsx from 'clsx'
import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

import styles from './Album.module.scss'
import * as apis from '../../../apis'
import { inforBtn } from '../../../ultis/buttonAudio'
import { ButtonAudio } from '../../../companents/ButtonAudio'
import { buttonAlbum } from '../../../ultis/button'
import { Button } from '../../../companents/Button'
import { Playlist } from '../../../companents/Playlist'
import { AudioSpinner } from '../../../companents/Spinner'
import { Mutating } from '../../../companents/Spinner'
import icons from '../../../ultis/icon'
import * as actions from '../../../store/action'

function Album() {
    const { pid } = useParams()
    const [data, setData] = useState({})
    const [ loadingData, setLoadingData ] = useState(false)
    const { BsPlayCircle } = icons
    const { isPlaying } = useSelector(state => state.play)
    const { dataFavoriteAlbum } = useSelector(state => state.music)
    const dispatch = useDispatch()
    const location = useLocation()
    const ref = useRef()

    useEffect(() => {
        async function fetchDetailPlaylist() {
            setLoadingData(true)
            const response = await apis.getDetailtPlaylist(pid)
            setLoadingData(false)

            if(response.data.err === 0) {
                setData(response.data?.data)
                dispatch(actions.setDataHistoryAlbums(response.data.data))
            }
        }
        fetchDetailPlaylist(pid)
    }, [pid])

    useEffect(() => {
        if(location.state?.playAlbum) {
            const idSong = data?.song?.items[0]?.encodeId
            if(idSong) dispatch(actions.setCurrent(idSong))
        }
    }, [data])

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }, [])

    function handlePlaySong() {
       dispatch(actions.play(!isPlaying))
    }

    function handleHeart() {
        if(dataFavoriteAlbum.some(el => el?.encodeId === data.encodeId)) {
            dispatch(actions.deleteFavoriteAlbum(data.encodeId))
        } else {
            dispatch(actions.addFavoriteAlbum(data))
        }
    }

    return (
        <div className={clsx(styles.container)}>
            {loadingData && 
                <div className="backgroundLoading">
                    <Mutating />
                </div>
            }

            <div className={clsx(styles.album)}>
                <div className={clsx(styles.wrrapInfor)}>
                    <div 
                        className={clsx(styles.wrrapImg)}
                        onClick={handlePlaySong}
                    >
                        <img className={clsx(styles.imgAlbum)} src={data?.thumbnailM}></img>

                        {isPlaying ? 
                            <span className={clsx(styles.audioSpinner)}>
                                <AudioSpinner />
                            </span> : 
                            <span className={clsx(styles.playIcon)}>
                                <BsPlayCircle size={45}/>
                            </span>
                        }
                    </div>

                    <h3 className={clsx(styles.name)}>{data?.title}</h3>

                    <p>
                        <span>Cập nhật: </span>
                        <span>{moment.unix(data?.contentLastUpdate).format("DD/MM/YYYY")}</span>
                    </p>

                    <p>
                        <span className={clsx(styles.singer)}>{data?.artistsNames}</span>
                    </p>

                    <p> {`${Math.round(data?.like / 1000)}K người yêu thích`}</p>

                    <div 
                        className={clsx(styles.play)}
                        onClick={handlePlaySong}
                    >
                        {isPlaying ? <Button item={buttonAlbum.pause}/> : <Button item={buttonAlbum.play}/>}
                    </div>

                    <div className={clsx(styles.wrrapOption)}>
                        <div className={clsx(styles.wrrapBtn)} onClick={handleHeart}>
                            <ButtonAudio
                                item={dataFavoriteAlbum.some(el => el?.encodeId === data.encodeId) ? inforBtn.loveBtnFill : inforBtn.loveBtnOutline}
                            />
                        </div>

                        <div className={clsx(styles.addBtn)}>
                            <ButtonAudio item={inforBtn.addBtnAlbum}/>
                        </div>
                    </div>
                </div>
        
                <div className={clsx(styles.wrrapList)} ref={ref}>
                    <p className={clsx(styles.title)}>
                        <span className={clsx(styles.header)}>Lời tựa </span>
                        <span className={clsx(styles.singerName)}>{data?.sortDescription}</span>
                    </p>

                    <div className={clsx(styles.playlist)}>
                        <Playlist 
                            item={data?.song?.items}
                            duration={data?.song?.totalDuration}
                            total={data?.song?.total}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Album