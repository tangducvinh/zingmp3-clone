import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import React from 'react'

import styles from './Play.module.scss'
import { Infor } from './Infor'
import { Control } from './Control'
import { Option } from './Option'
import * as apis from '../../apis/music'
import * as actions from '../../store/action'

function Play() {
    const { curSongId, curSourse } = useSelector(state => state.music)
    const { isRepeat, isShowAudio } = useSelector(state => state.play)
    const [infor, setInfor] = useState({})
    const audioEl = useRef(new Audio())
    const dispatch = useDispatch()

    async function fetchDetailSong() {
        const response = await apis.getDetailSong(curSongId)

        if (response.data.err === 0) {
            setInfor(response.data.data)


            dispatch(actions.setRecentPlaylist(response.data.data))
            dispatch(actions.addHistoryPlaylist(response.data.data))
        }
    }

    useEffect(() => {
        fetchDetailSong()
    }, [curSongId])

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.infor)}>
                <Infor item={infor}/>
            </div>

            <div className={clsx(styles.control)}>
                <Control 
                    duration={infor.duration}
                    audioEl={audioEl}
                />
            </div>

            <div className={clsx(styles.option)}>
                <Option audioEl={audioEl}/>
            </div>
        </div> 
    )
}

export default Play