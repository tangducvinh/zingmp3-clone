import clsx from 'clsx'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import styles from './Option.module.scss'
import { ButtonAudio } from '../../ButtonAudio'
import { option } from '../../../ultis/buttonAudio'

function Option() {
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
                <div className={clsx(styles.wrrapBtn)}>
                    < ButtonAudio 
                        item={option.speaker}
                    />
                </div>

                <div className={clsx(styles.row)}>

                </div>

                <Tippy
                    content={<span className={clsx(styles.tippy)}>Danh sách phát</span>}
                >
                    <div className={clsx(styles.list)}>
                        {option.list.icon}
                    </div>
                </Tippy>
        </div>
    )
}

export default Option