import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react'
import { useParams } from 'react-router-dom'

import styles from './Control.module.scss'
import { ButtonAudio } from '../../ButtonAudio'
import { controlBtn } from '../../../ultis/buttonAudio'
import { Rotating } from '../../Spinner'
import * as action from '../../../store/action'
import moment from 'moment'
import * as apis from '../../../apis'

function Control({  duration, audioEl }) {
    const dispatch = useDispatch()
    const { isPlaying, isRandom , isVip, isLoad, isSkip} = useSelector(state => state.play)
    var {curPlaylistId, recentPlaylist, curSourse, curSongId, historyPlaylist, dataNextSong, dataZingchart } = useSelector(state => state.music)
    const interval = useRef()
    const currentDurationEl = useRef()
    const totalDurationEl = useRef()
    const btnRandomElement = useRef()
    const btnPreviousElement = useRef()
    const btnNextElement = useRef()
    const btnRepeatElement = useRef()
    const currentTimeEl = useRef()
    const repeatMode = ['off', 'on', 'one']
    const [isRepeat, setIsRepeat] = useState(repeatMode[0])
    const [repeatIcon, setRepeatIcon] = useState(controlBtn.repeat)
    const { pid } = useParams()
    const [ indexSong, setIndexSong ] = useState(null)

    console.log(curSongId)

    // handle play song
    useEffect(() => {
        const set = setTimeout(() => {
            console.log('hello')
            dispatch(action.play(true))
            audioEl.current.src = curSourse
            audioEl.current.load()
            audioEl.current.play()
        }, [10000])

        return () => clearTimeout(set)
    }, [curSourse])

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
            audioEl?.current.play()
            interval.current = setInterval(() => {
                let percent = (audioEl.current.currentTime / audioEl.current.duration) * 100
                if (currentDurationEl.current) currentDurationEl.current.style.width = `${percent}%`
                currentTimeEl.current.innerText = moment(Math.round(audioEl.current.currentTime) * 1000).format('mm:ss')
            }, 200)

            return () => clearInterval(interval.current)
        } else {
            audioEl.current.pause()
            interval.current && clearInterval(interval.current)
        }

        if(isPlaying && isSkip) dispatch(action.setSkip(false))
    }, [isPlaying])

    // handle progresbar
    function handleClickProgressbar(e) {
        const totalDurationRect = totalDurationEl.current.getBoundingClientRect()
        const percent = (e.clientX - totalDurationRect.left) / totalDurationRect.width * 100

        currentDurationEl.current.style.width = `${percent}%`
        audioEl.current.currentTime = percent / 100 * audioEl.current.duration
    }

    // handle random song
    useEffect(() => {
        if(isRandom === false) btnRandomElement.current.style.opacity = '0.2'  
        else btnRandomElement.current.style.opacity = '1'
    }, [isRandom])

    function handleRandomStatus() {
        if (isRandom) dispatch(action.random(false))
        else dispatch(action.random(true))
    }

    // function handleRandomSong() {
    //     let random = Math.round(Math.random() * (dataPlaylist?.total - 1))
    //     while(indexSong === random) {
    //         random = Math.round(Math.random() * (dataPlaylist?.total - 1))
    //     }
    //     return random
    // }

    //handle previous song
    useEffect(() => {
        if(isRandom || historyPlaylist.length === 0) btnPreviousElement.current.style.opacity = '0.2'  
        else btnPreviousElement.current.style.opacity = '1'
    }, [historyPlaylist, isRandom])

    async function handlePreviousSong() {
        if(!isRandom && historyPlaylist.length > 0) {
        
            const songId = historyPlaylist[historyPlaylist.length - 2]?.encodeId
            console.log(songId)

            dispatch(action.load(true))
            const response = await apis.getSong(songId)
            dispatch(action.load(false))

            if (response.data.err === 0) {
                dispatch(action.setCurSongId(songId))
                dispatch(action.setSourse(response.data.data['128']))
            }
            
            dispatch(action.deleteHistoryPlaylist())
            dispatch(action.play(true))
        } else {
            return
        }
    }

    console.log(curSourse)

    // console.log(isRandom)
    console.log(isPlaying)

    //hanlde next song
    async function handleNextSong() {

        let findIndex
        dataNextSong.forEach((item, index) => {
            if (item.encodeId === curSongId) {
                
                return findIndex = index
            }
        })

        if (findIndex === undefined || findIndex >= dataNextSong.length - 1) {
            setIndexSong(0)
        } else {
            setIndexSong(findIndex + 1) 
        } 
    }

    async function checkSourseSong(index) {
        const songId = dataNextSong[index]?.encodeId
        dispatch(action.play(false))
        dispatch(action.load(true))
        const response = await apis.getSong(songId)
        dispatch(action.load(false))

        if (response.data.err === 0) {
            dispatch(action.setCurSongId(songId, index))
            dispatch(action.setSourse(response.data.data['128']))
            dispatch(action.play(true))
        }
        else {
            if(indexSong >= dataNextSong.length - 1) setIndexSong(0)
            else setIndexSong(indexSong + 1)
        }
    }

    useEffect(() => {
        if (indexSong !== null) checkSourseSong(indexSong)
    }, [indexSong])

    // useEffect(() => {
    //     if(isVip && isRepeat === repeatMode[1]) {
    //         dispatch(action.checkVip(false))
    //         handleNextSong()
    //     }
    // }, [isVip])

    // handle btn repeat
    useEffect(() => {
        if(isRepeat === repeatMode[0]) {
            btnRepeatElement.current.style.opacity = '0.5'
            setRepeatIcon(controlBtn.repeat)

            dispatch(action.setRepeat(false))
        } else if (isRepeat === repeatMode[1]) {
            btnRepeatElement.current.style.opacity = '1'
            setRepeatIcon(controlBtn.repeatOn)
            dispatch(action.setRepeat(true))
        } else {
            dispatch(action.setRepeat(false))
            setRepeatIcon(controlBtn.repeatOnly)
        }
    }, [isRepeat])

    function handleRepeatSong() {
        if(isRepeat === repeatMode[0]) {
            setIsRepeat(repeatMode[1])
        } else if (isRepeat === repeatMode[1]) {
            setIsRepeat(repeatMode[2])
        } else {
            setIsRepeat(repeatMode[0])
        }
        dispatch(action.random(false))
    }

    // handle ended song
    useEffect(() => {
        async function handleEndSong() {
            if(curPlaylistId && isRepeat === repeatMode[1] && recentPlaylist.length > 1) {
                dispatch(action.load(true))
                const response = await apis.getSong(recentPlaylist[recentPlaylist.length - 1].encodeId)
                dispatch(action.load(false))

                if (response.data.err === 0) {
                    dispatch(action.setCurSongId(recentPlaylist[recentPlaylist.length - 1].encodeId, recentPlaylist.length - 1))
                    dispatch(action.setSourse(response.data.data['128']))
                }
                else dispatch(action.setShowVip(true))
            }
            else if(isRepeat === repeatMode[2]) audioEl.current.play()
            else handleNextSong()
        }

        audioEl.current.addEventListener('ended', handleEndSong)

        return () => {
            audioEl.current.removeEventListener('ended', handleEndSong)
        }
    })

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.directional)}>
                <div 
                    className={clsx(styles.button)}
                    onClick={handleRandomStatus}
                    ref={btnRandomElement}
                >
                    {isRandom ? 
                        <ButtonAudio item={controlBtn.randomOn}/> 
                    : 
                        <ButtonAudio item={controlBtn.random}/>
                    }
                </div>
                <div 
                    className={clsx(styles.button)}
                    onClick={handlePreviousSong}
                    ref={btnPreviousElement}
                >
                    <ButtonAudio
                        item={controlBtn.back}
                    />
                </div>
                <div className={clsx(styles.play)} onClick={handlePlayMusic}>
                    {isLoad ? 
                        <span className={clsx(styles.rotating)}><Rotating /></span> : 
                        isPlaying ? 
                            controlBtn.play.iconPause : controlBtn.play.iconPlay
                    }
                </div>
                <div 
                    className={clsx(styles.button)}
                    ref={btnNextElement}
                    onClick={() => handleNextSong()}
                >
                    <ButtonAudio 
                        item={controlBtn.next}
                    />
                </div>
                <div 
                    className={clsx(styles.button)}
                    ref={btnRepeatElement}
                    onClick={handleRepeatSong}
                >
                    <ButtonAudio 
                        item={repeatIcon}
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
                <span className={clsx(styles.totalTime)}>
                    {moment(Math.round(duration) * 1000).format('mm:ss')}
                </span>
            </div>
        </div>
    )
}

export default memo(Control)