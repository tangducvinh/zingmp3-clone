import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react'
import { useParams } from 'react-router-dom'

import styles from './Control.module.scss'
import { ButtonAudio } from '../../ButtonAudio'
import { controlBtn } from '../../../ultis/buttonAudio'
import * as action from '../../../store/action'
import moment from 'moment'
import * as apis from '../../../apis'

function Control({ sourse }) {
    const { pid } = useParams()
    const dispatch = useDispatch()
    const { isPlaying } = useSelector(state => state.play)
    var { indexSong } = useSelector(state => state.music)
    const interval = useRef()
    const audioEl = useRef(new Audio())
    const currentDurationEl = useRef()
    const totalDurationEl = useRef()
    const currentTimeEl = useRef()

    useEffect(() => {
        audioEl.current.pause()
        audioEl.current.src = sourse
        audioEl.current.load()
        if(isPlaying) audioEl.current.play()
    }, [sourse])

    function handlePlayMusic() {
        if (isPlaying) {
            audioEl.current.pause()
            dispatch(action.play(false))
        } else {
            audioEl.current.play()
            dispatch(action.play(true))
        }
    }

    useEffect(() => {
        if(isPlaying) {
            interval.current = setInterval(() => {
                let percent = (audioEl.current.currentTime / audioEl.current.duration) * 100
                currentDurationEl.current.style.width = `${percent}%`
                currentTimeEl.current.innerText = moment(Math.round(audioEl.current.currentTime) * 1000).format('mm:ss')
            }, 200)
        } else {
            interval.current && clearInterval(interval.current)
        }
    }, [isPlaying])

    function handleClickProgressbar(e) {
        const totalDurationRect = totalDurationEl.current.getBoundingClientRect()
        const percent = (e.clientX - totalDurationRect.left) / totalDurationRect.width * 100

        currentDurationEl.current.style.width = `${percent}%`
        audioEl.current.currentTime = percent / 100 * audioEl.current.duration
    }

    const [ dataPlaylist, setDataPlayList ] = useState(null)
    useEffect(() => {
        async function getDataPlaylist() {
            const response = await apis.getDetailtPlaylist(pid)
            setDataPlayList(response.data.data.song)
        }

        getDataPlaylist()
    }, [])

    const btnRandomElement = useRef()
    const [ isRandom, setRandom ] = useState(false)
    function randomStatus() {
        setRandom(prev => !prev)
        if (isRandom) btnRandomElement.current.style.opacity = '1'
        else btnRandomElement.current.style.opacity = '0.5'
    }

    console.log(isRandom)

    function handleRandomSong() {
        let random = Math.round(Math.random() * (dataPlaylist.total - 1))
        while(indexSong === random) {
            random = Math.round(Math.random() * (dataPlaylist.total - 1))
        }
        return random
    }

    function handlePreviousSong() {
        if(indexSong !== 0 && isRandom === false) indexSong--;
        if(isRandom) indexSong = handleRandomSong()
        const songId = dataPlaylist.items[indexSong].encodeId
        dispatch(action.setCurSongId(songId, indexSong))
        dispatch(action.play(true))
    }

    function handleNextSong() {
        if (indexSong === dataPlaylist.total - 2) {
            indexSong = 0
        } else {
            indexSong++
        }
        const songId = dataPlaylist.items[indexSong].encodeId
        dispatch(action.setCurSongId(songId, indexSong))
        dispatch(action.play(true))
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.directional)}>
                <div 
                    className={clsx(styles.button)}
                    onClick={randomStatus}
                    ref={btnRandomElement}
                >
                    <ButtonAudio 
                        item={controlBtn.random}
                    />
                </div>
                <div 
                    className={clsx(styles.button)}
                    onClick={handlePreviousSong}
                >
                    <ButtonAudio 
                        item={controlBtn.back}
                    />
                </div>
                <div className={clsx(styles.play)} onClick={handlePlayMusic}>
                    {isPlaying ? controlBtn.play.iconPause : controlBtn.play.iconPlay}
                </div>
                <div 
                    className={clsx(styles.button)}
                    onClick={handleNextSong}
                >
                    <ButtonAudio 
                        item={controlBtn.next}
                    />
                </div>
                <div className={clsx(styles.button)}>
                    <ButtonAudio 
                        item={controlBtn.repeat}
                    />
                </div>
            </div>

            <div className={clsx(styles.progressBar)}>
                <span className={clsx(styles.totalTimeCurrent)} ref={currentTimeEl}>{'00:00'}</span>
                <div 
                    className={clsx(styles.totalDuration)}
                    onClick={handleClickProgressbar}
                    ref={totalDurationEl}
                >
                    <div 
                        className={clsx(styles.currentDuration)}
                        ref={currentDurationEl}
                    >
                    </div>
                </div>
                <span className={clsx(styles.totalTime)}>{moment(Math.round(audioEl.current.duration) * 1000).format('mm:ss')}</span>
            </div>
        </div>
    )
}

export default memo(Control)