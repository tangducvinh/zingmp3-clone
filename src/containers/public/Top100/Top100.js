import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'

import styles from './Top100.module.scss'
import { Theme } from '../../../companents/Theme'

function Top100() {
    const { dataTop100 } = useSelector(state => state.music) 
    const ref = useRef()

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }, [])
    
    return (
        <div className={clsx(styles.container)}>
            {dataTop100 && 
                <>
                    <div className={clsx(styles.prominent)} ref={ref}>
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