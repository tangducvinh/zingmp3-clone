import clsx from 'clsx'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';

import styles from './ButtonAudio.module.scss'

function ButtonAudio({item}) {
    return (
        <>
            {item.content ? 
                <Tippy
                    content={<span className={clsx(styles.tippy)}>{item.content}</span>}
                >
                    <div className={clsx(styles.container, {[styles.color]: item.color})}>
                        {item.icon}
                    </div>
                </Tippy> 
                :
                <div className={clsx(styles.container)}>
                    {item.icon}
                </div>
            }
        </>
    )
}

export default ButtonAudio