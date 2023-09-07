import clsx from 'clsx'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import styles from './Sevice.module.scss'
import { sevices } from '../../../ultis/sevices'

function Sevice() {
    return (
        <>
            {sevices.map(item => 
                <Tippy
                    content={<span className={styles.tippy}>{item.text}</span>}
                >
                    <button className={clsx(styles.setting)}>
                        {item.icon}
                    </button>
                </Tippy>
            )}
        </>
    )
}

export default Sevice