import clsx from 'clsx'

import styles from './Control.module.scss'
import { ButtonAudio } from '../../ButtonAudio'
import { controlBtn } from '../../../ultis/buttonAudio'

function Control() {
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
                    <div className={clsx(styles.play)}>
                        {controlBtn.play.icon}
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

export default Control