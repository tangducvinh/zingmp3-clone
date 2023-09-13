import clsx from 'clsx'

import styles from './Audio.module.scss'
import { Infor } from './Infor'
import { Control } from './Control'
import { Option } from './Option'

function Audio() {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.infor)}>
                <Infor />
            </div>

            <div className={clsx(styles.control)}>
                <Control />
            </div>

            <div className={clsx(styles.option)}>
                <Option />
            </div>
        </div> 
    )
}

export default Audio