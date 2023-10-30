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
 
function SongChart() {
    const { songChart } = useSelector(state => state.app)
    const { BsPlayCircleFill } = icons
    const dispatch = useDispatch() 

    function handlePlaySong(item, index) {
        dispatch(actions.setCurSongId(item.encodeId, index))
        dispatch(actions.play(true))
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapTitle)}>
                <Link to={'/zing-chart'} className={clsx(styles.zingchartLink)} href="">#zingchart</Link>
                <span className={clsx(styles.playIcon)}>
                    <BsPlayCircleFill />
                </span>
            </div>

            <div className={clsx(styles.content)}>
                <div className={clsx(styles.wrapInforSong)}>
                    {songChart?.items?.filter((item, index) => index <= 2).map((item, index) => (
                        <div 
                            className={clsx(styles.inforSong)}
                            key={item.encodeId}
                            onClick={() => handlePlaySong(item, index)}
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

                
                <div className={styles.chart}>
                    <ChartItem dataChart={songChart}/>
                </div>
                

                {/* <div className={clsx(styles.wrapChart)}>
                    {data && <Line data={data} options={options} />}
                    <div 
                        className={clsx(styles.toolTip)} 
                        style={{top: tooltipState.top, left: tooltipState.left, display: tooltipState.display, position: 'absolute'}}
                    >
                        <InforSong item={songChart?.items?.find(item => item.encodeId === tooltipState.encodeId)} sizeSM sizeM/>
                        <span className={clsx(styles.tooltipPercent)}>
                            {`${Math.round(songChart?.items?.find(item => item.encodeId === tooltipState.encodeId)?.score / songChart?.chart?.totalScore * 100)}%`}</span>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default SongChart