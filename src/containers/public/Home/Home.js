import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useRef, useEffect } from 'react'

import styles from './Home.module.scss'
import { Slider } from '../../../companents/Slider'
import { NewRelease } from '../../../companents/NewRelease'
import { Theme } from '../../../companents/Theme'
import { SongRank } from '../../../companents/SongRank'
import { useSelector } from 'react-redux'
import { SongChart } from '../../../companents/SongChart'
import { Mutating } from '../../../companents/Spinner'

function Home() {
    const { theme, weekChart } = useSelector(state => state.app)
    const navigate = useNavigate()
    const ref = useRef()

    function handleChoseChart(link) {
        const path = link.split('.')[0]
        navigate(path)
    }

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }, [])

    return (
        <div className={clsx(styles.container)}>
            {!theme && <div className={clsx(styles.loading)}><Mutating /></div>}

            <div className={clsx(styles.slider)} ref={ref}>
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
                            alt='banner'
                        ></img>
                    </div>
                ))}
            </div>

            <div className={clsx(styles.songRank)}>
                <SongRank />
            </div>

            <div className={clsx(styles.songChart)}>
                <SongChart />
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