import clsx from 'clsx'

import styles from './Home.module.scss'
import { Slider } from '../../../companents/Slider'

function Home() {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.slider)}>
                <Slider />
            </div>     
        </div>
    )

}

export default Home