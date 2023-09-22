import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react'

import styles from './Control.module.scss'
import { ButtonAudio } from '../../ButtonAudio'
import { controlBtn } from '../../../ultis/buttonAudio'
import * as action from '../../../store/action'

function Control({ sourse }) {
    const dispatch = useDispatch()
    const { isPlaying } = useSelector(state => state.play)
    const audioEl = useRef(new Audio())

    useEffect(() => {
        audioEl.current.pause()
        audioEl.current.src = sourse
        audioEl.current.load()
        if (isPlaying) audioEl.current.play()
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

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.directional)}>
                <div className={clsx(styles.wrrap)}>
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
            </div>
        </div>
    )
}

export default memo(Control)