import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react'

import styles from './Control.module.scss'
import { ButtonAudio } from '../../ButtonAudio'
import { controlBtn } from '../../../ultis/buttonAudio'
import * as action from '../../../store/action'
import moment from 'moment'


function Control({ sourse }) {
    const dispatch = useDispatch()
    const { isPlaying } = useSelector(state => state.play)
    const audioEl = useRef(new Audio())
    var interval = useRef()
    const currentDurationEl = useRef()
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
                console.log('hello')
            }, 200)
        } else {
            interval.current && clearInterval(interval.current)
        }
    }, [isPlaying])

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.directional)}>
                <div className={clsx(styles.button)}>
                    <ButtonAudio 
                        item={controlBtn.random}
                    />
                </div>
                <div className={clsx(styles.button)}>
                    <ButtonAudio 
                        item={controlBtn.back}
                    />
                </div>
                <div className={clsx(styles.play)} onClick={handlePlayMusic}>
                    {isPlaying ? controlBtn.play.iconPause : controlBtn.play.iconPlay}
                </div>
                <div className={clsx(styles.button)}>
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
                <div className={clsx(styles.totalDuration)}>
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