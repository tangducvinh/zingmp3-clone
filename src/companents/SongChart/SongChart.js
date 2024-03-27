import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import styles from './SongChart.module.scss'
import icons from '../../ultis/icon'
import { InforSong } from '../InforSong'
import { Button } from '../Button'
import  * as actions from '../../store/action'
import { ChartItem } from '../ChartItem'
import * as apis from '../../apis'
 
function SongChart() {
    const { songChart } = useSelector(state => state.app)
    const { BsPlayCircleFill } = icons
    const dispatch = useDispatch() 

    async function handlePlaySong(item) {
        dispatch(actions.setCurrent(item.encodeId))

        // dispatch(actions.setSkip(false))
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapTitle)}>
                <Link to={'/zing-chart'} className={clsx(styles.zingchartLink)} href="">#zingchart</Link>
                <span className={clsx(styles.playIcon)}>
                    <BsPlayCircleFill />
                </span>
            </div>

            <div className={clsx(styles.content, styles.flexColumn)}>
                <div className={clsx(styles.wrapInforSong)}>
                    {songChart?.items?.filter((item, index) => index <= 2).map((item, index) => (
                        <div 
                            className={clsx(styles.inforSong)}
                            key={item.encodeId}
                            onClick={() => handlePlaySong(item)}
                        >
                            <span 
                                className={clsx(styles.orderIndex, {
                                    [styles.textShadowNo1]: index === 0,
                                    [styles.textShadowNo2]: index === 1,
                                    [styles.textShadowNo3]: index === 2,

                                })}
                            >
                                {index + 1}
                            </span>
                            <InforSong item={item} sizeL play/>
                            <span className={clsx(styles.percent)}>{`${Math.round(item.score / songChart?.chart.totalScore * 100)}%`}</span>
                        </div>
                    ))}

                    <Link 
                        className={clsx(styles.btnMore)}
                        to={'/zing-chart'}
                    >
                        <Button item={{text: 'Xem thêm'}}/>
                    </Link>
                </div>
                
                <div className={clsx(styles.chart)}>
                    <ChartItem dataChart={songChart}/>

                    <div className={clsx(styles.chartEmpty)}></div>
                </div>
            </div>
        </div>
    )
}

export default SongChart