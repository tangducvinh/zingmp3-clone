import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react'

import styles from './Control.module.scss'
import { ButtonAudio } from '../../ButtonAudio'
import { controlBtn } from '../../../ultis/buttonAudio'
import { Rotating } from '../../Spinner'
import * as action from '../../../store/action'
import moment from 'moment'
import * as apis from '../../../apis'

function Control({  duration, audioEl }) {
    const dispatch = useDispatch()
    const { isPlaying, isRandom ,isLoad} = useSelector(state => state.play)
    var { curSourse, historyPlaylist, dataNextSong, dataZingchart, inforCurrent } = useSelector(state => state.music)
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

    // handle play song
    useEffect(() => {
        audioEl.current.src = curSourse
        audioEl.current.load()
        if (isPlaying) audioEl.current.play()
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
                currentDurationEl.current.style.width = `${percent}%`
                currentTimeEl.current.innerText = moment(Math.round(audioEl.current.currentTime) * 1000).format('mm:ss')
            }, 200)

            return () => clearInterval(interval.current)
        } else {
            audioEl.current.pause()
            interval.current && clearInterval(interval.current)
        }

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

    useEffect(() => {
        if(isRandom || historyPlaylist.length === 0) btnPreviousElement.current.style.opacity = '0.2'  
        else btnPreviousElement.current.style.opacity = '1'
    }, [historyPlaylist, isRandom])

    async function handlePreviousSong() {
        if(!isRandom && historyPlaylist.length > 0) {
            const songId = historyPlaylist[historyPlaylist.length - 2]?.encodeId
            dispatch(action.setCurrent(songId))
            dispatch(action.deleteHistoryPlaylist())
        } else {
            return
        }
    }


    //hanlde next song
    async function handleNextSong() {
        if (isRandom) {
            const indexRandom = Math.round(Math.random() * (dataNextSong.length - 1))
            return checkSourseSong(indexRandom)
        }

        let findIndex
        dataNextSong.forEach((item, index) => {
            if (item.encodeId === inforCurrent.encodeId) {
                return findIndex = index
            }
        })

        if (findIndex === undefined) {
            return checkSourseSong(0)
        }

        if (findIndex >= dataNextSong.length - 1) {
            if (isRepeat === repeatMode[1]) {
                return checkSourseSong(0)
            } else {
                dispatch(action.setDataNextSong(dataZingchart.RTChart.items))
                return checkSourseSong(0)
            }
        } else {
            return checkSourseSong(findIndex + 1)
        }
    }

    async function checkSourseSong(index) {
        const songId = dataNextSong[index]?.encodeId

        dispatch(action.load(true))
        const [res1, res2] = await Promise.all([
            apis.getSong(songId),
            apis.getDetailSong(songId)
        ])
        dispatch(action.load(false))

        if(res1.data.err === 0 && res2.data.err === 0) {
            dispatch(action.setInforCurrent(res2.data.data))
            dispatch(action.setSourse(res1.data.data['128']))
            dispatch(action.play(true))
            dispatch(action.setRecentPlaylist(res2.data.data))
            dispatch(action.addHistoryPlaylist(res2.data.data))
        } else {
            if (index >= dataNextSong.length - 1) {
                if (isRepeat === repeatMode[1]) {
                    return checkSourseSong(0)
                } else {
                    dispatch(action.setDataNextSong(dataZingchart.RTChart.items))
                    return checkSourseSong(0)
                }
            } else {
                return checkSourseSong(index + 1)
            }
        }
    }

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
            if(isRepeat === repeatMode[2]) audioEl.current.play()
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