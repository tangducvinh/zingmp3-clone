import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

import styles from './Home.module.scss'
import { Slider } from '../../../companents/Slider'
import { NewRelease } from '../../../companents/NewRelease'
import { Theme } from '../../../companents/Theme'
import { SongRank } from '../../../companents/SongRank'
import { useSelector } from 'react-redux'
import { SongChart } from '../../../companents/SongChart'

function Home() {
    const { theme, weekChart, songChart } = useSelector(state => state.app)
    const navigate = useNavigate()

    function handleChoseChart(link) {
        const path = link.split('.')[0]
        navigate(path)
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.slider)}>
                <Slider />
            </div> 

            <div className={clsx(styles.newRelease)}>
                <NewRelease />
            </div>    

            <div className={clsx(styles.weekChart)}>
                {weekChart.map(item => (
                    <div 
                        className={clsx(styles.wrapImgWeekChart)}
                        key={item.link}
                    >
                        <img 
                            className={clsx(styles.imgWeekChart)} src={item.cover}
                            onClick={() => handleChoseChart(item.link)}
                        ></img>
                    </div>
                ))}
            </div>

            <div className={clsx(styles.songRank)}>
                <SongRank />
            </div>

            <div className={clsx(styles.songChart)}>
                <SongChart data={songChart}/>
            </div>

            {theme?.map(item => 
                <div 
                    className={clsx(styles.theme)}
                    key={item.sectionId}
                >
                    <Theme data={item}/>
                </div>
            )}
        </div>
    )

}

export default Home