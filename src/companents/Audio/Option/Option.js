import clsx from 'clsx'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, memo} from 'react'

import styles from './Option.module.scss'
import { ButtonAudio } from '../../ButtonAudio'
import { option } from '../../../ultis/buttonAudio'
import * as actions from '../../../store/action'

function Option({ audioEl }) {
    const dispatch = useDispatch()
    const { sidebarRight } = useSelector(state => state.play)
    const [ volume, setVolume ] = useState(70)

    function handleStatusSidebarRight() {
        dispatch(actions.sidebarRight(!sidebarRight))
    }

    function handleChangeVolume(e) {
        setVolume(e.target.value)
    }

    function handleSpeaker() {
        if(volume != 0) setVolume(0)
        else setVolume(70)
    }

    useEffect(() => {
        audioEl.current.volume = volume / 100
    }, [volume])

    return (
        <div className={clsx(styles.container)}>
                <div className={clsx(styles.wrrapBtn)}>
                    < ButtonAudio 
                        item={option.mv}
                    />
                </div>
                <div className={clsx(styles.wrrapBtn)}>
                    < ButtonAudio 
                        item={option.lyric}
                    />
                </div>
                <div className={clsx(styles.wrrapBtn)}>
                    < ButtonAudio 
                        item={option.windown}
                    />
                </div>
                
                <div className={clsx(styles.wrapVolume)}>
                    <div 
                        className={clsx(styles.wrrapBtn)}
                        onClick={handleSpeaker}
                    >
                        {volume != 0 ? 
                            <ButtonAudio item={option.speaker} /> : 
                            <ButtonAudio item={option.noSpeaker} />
                        }
                    </div>

                    <input 
                        type='range' 
                        step={1} min={0} 
                        max={100} 
                        value={volume}
                        onChange={handleChangeVolume}
                        className={clsx(styles.volumeInput)}
                    >
                    </input>
                </div>

                <div className={clsx(styles.row)}></div>

                <Tippy
                    content={<span className={clsx(styles.tippy)}>Danh sách phát</span>}
                >
                    <div 
                        className={clsx(styles.list, {[styles.sidebarActive]: sidebarRight === true})}
                        onClick={handleStatusSidebarRight}
                    >
                        {option.list.icon}
                    </div>
                </Tippy>
        </div>
    )
}

export default memo(Option)