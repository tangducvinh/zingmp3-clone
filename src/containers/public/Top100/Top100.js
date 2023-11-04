import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import styles from './Top100.module.scss'
import { Theme } from '../../../companents/Theme'
import * as actions from '../../../store/action'

function Top100() {
    const { dataTop100 } = useSelector(state => state.music) 
    const dispatch = useDispatch()

    console.log(dataTop100)
    
    return (
        <div className={clsx(styles.container)}>
            {dataTop100 && 
                <>
                    <div className={clsx(styles.prominent)}>
                        <Theme data={dataTop100[0]} />
                    </div>

                    <div className={clsx(styles.prominent)}>
                        <Theme data={dataTop100[1]} full/>
                    </div>

                    <div className={clsx(styles.prominent)}>
                        <Theme data={dataTop100[2]} />
                    </div>

                    <div className={clsx(styles.prominent)}>
                        <Theme data={dataTop100[3]} full/>
                    </div>

                    <div className={clsx(styles.prominent)}>
                        <Theme data={dataTop100[4]} full/>
                    </div>
                </>
            }
        </div>
    )
}

export default Top100