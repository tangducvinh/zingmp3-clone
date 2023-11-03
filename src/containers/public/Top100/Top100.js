import clsx from 'clsx'
import { useSelector } from 'react-redux'

import styles from './Top100.module.scss'
import { Theme } from '../../../companents/Theme'

function Top100() {
    const { dataTop100 } = useSelector(state => state.music) 
    
    return (
        <div className={clsx(styles.container)}>
            {dataTop100 && 
                <>
                    <div className={clsx(styles.prominent)}>
                        <Theme data={dataTop100[0]} />
                    </div>
                </>
            }
        </div>
    )
}

export default Top100