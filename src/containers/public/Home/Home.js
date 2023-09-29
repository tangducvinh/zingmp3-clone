import clsx from 'clsx'

import styles from './Home.module.scss'
import { Slider } from '../../../companents/Slider'
import { NewRelease } from '../../../companents/NewRelease'
import { ItemTheme } from '../../../companents/ItemTheme'
import { useSelector } from 'react-redux'

function Home() {
    const { 
        firstTheme,
        secondTheme,
        thirdTheme,
        fourthTheme,
        artistTheme,
    } = useSelector(state => state.app)

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.slider)}>
                <Slider />
            </div> 

            <div className={clsx(styles.newRelease)}>
                <NewRelease />
            </div>    

            <div className={clsx(styles.theme)}>
                <ItemTheme data={firstTheme}/>
            </div>

            <div className={clsx(styles.theme)}>
                <ItemTheme data={secondTheme}/>
            </div>

            <div className={clsx(styles.theme)}>
                <ItemTheme data={thirdTheme}/>
            </div>

            <div className={clsx(styles.theme)}>
                <ItemTheme data={fourthTheme}/>
            </div>

            <div className={clsx(styles.theme)}>
                <ItemTheme data={artistTheme}/>
            </div>
        </div>
    )

}

export default Home