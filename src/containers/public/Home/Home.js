import clsx from 'clsx'

import styles from './Home.module.scss'
import { Slider } from '../../../companents/Slider'
import { NewRelease } from '../../../companents/NewRelease'

function Home() {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.slider)}>
                <Slider />
            </div> 

            <div className={clsx(styles.newRelease)}>
                <NewRelease />
            </div>    
        </div>
    )

}

export default Home