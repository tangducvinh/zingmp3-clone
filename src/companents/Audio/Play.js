import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import React from 'react'

import styles from './Play.module.scss'
import { Infor } from './Infor'
import { Control } from './Control'
import { Option } from './Option'

function Play() {
    const { inforCurrent, dataFavoritePlaylist } = useSelector(state => state.music)
    const audioEl = useRef(new Audio())

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.infor)}>
                <Infor item={inforCurrent}/>
            </div>

            <div className={clsx(styles.control)}>
                <Control 
                    duration={inforCurrent.duration}
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