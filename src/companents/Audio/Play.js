import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import React from 'react'

import styles from './Play.module.scss'
import { Infor } from './Infor'
import { Control } from './Control'
import { Option } from './Option'
import * as apis from '../../apis/music'

function Play() {
    const { curSongId } = useSelector(state => state.music)
    const [infor, setInfor] = useState({})
    const [sourse, setSourse] = useState(null)

    useEffect(() => {
        async function fetchDetailSong() {
            const [res1, res2] = await Promise.all([
                apis.getDetailSong(curSongId),
                apis.getSong(curSongId)
            ])

            if (res1.data.err === 0) {
                if(res2.data.err === 0) {
                    setInfor(res1.data.data)
                }
            }

            if (res2.data.err === 0) {
                setSourse(res2.data.data['128'])
            } else {
                console.log('bai hat chi danh cho vip')
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
                />
            </div>

            <div className={clsx(styles.option)}>
                <Option />
            </div>
        </div> 
    )
}

export default Play