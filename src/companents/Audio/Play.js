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
    const { curSongId } = useSelector(state => state.music)
    const [infor, setInfor] = useState({})
    const [sourse, setSourse] = useState(null)
    const audioEl = useRef(new Audio())
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchDetailSong() {
            dispatch(actions.load(true))
            const [res1, res2] = await Promise.all([
                apis.getDetailSong(curSongId),
                apis.getSong(curSongId)
            ])

            if (res1.data.err === 0) {
                if (res2.data.err === 0) {
                    setInfor(res1.data.data)
                }
            }

            if (res2.data.err === 0) {
                setSourse(res2.data.data['128'])
                dispatch(actions.checkVip(false))
                dispatch(actions.load(false))
            } else {
                console.log('baivip')
                dispatch(actions.checkVip(true))
                dispatch(actions.load(false))
            }

        }
        fetchDetailSong()
    }, [curSongId])

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.infor)}>
                <Infor item={infor}/>
            </div>

            <div className={clsx(styles.control)}>
                <Control 
                    sourse={sourse}
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