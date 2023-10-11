import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import _ from 'lodash'

import styles from './SongChart.module.scss'
import icons from '../../ultis/icon'
import { InforSong } from '../InforSong'
import { Button } from '../Button'
import  * as actions from '../../store/action'
 
function SongChart() {
    const { songChart } = useSelector(state => state.app)
    const { BsPlayCircleFill } = icons
    const [ data, setData ] = useState()
    const dispatch = useDispatch()
    const [ tooltipState, setToolTipState ] = useState({display: 'none', top: 0, left: 0, encodeId: null})

    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { borderDash: [4, 4], color: 'rgba(255, 255, 255, 0.2)', drawTicks: false },
                border: { dash: [2, 5]},
            },
            x: {
                ticks: { color: '#98959A' },
                grid: { color: 'transparent'}
            }
        }, 
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({tooltip}) => {
                    if (tooltip.opacity === 0) {
                        if (tooltipState.display !== 'none') setToolTipState(prev => ({...prev, display: 'none'}))
                        return
                    }
                    
                    const counterArray = []
                    for (let i = 0; i <= 2; i++) {
                        counterArray.push({
                            data: songChart.chart.items[Object.keys(songChart.chart.items)[i]].filter(item => item.hour % 2 === 0).map(item => item.counter),
                            songId: Object.keys(songChart.chart.items)[i]
                        })
                    }

                    const currentCounter = tooltip.body[0].lines[0].replace(',', '')
                    const encodeId = counterArray.find(item => (item.data.some(item => item == currentCounter)) == true).songId
                    
                    const newTooltipData = {
                        display: 'flex',
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                        encodeId,
                    }

                    if (!_.isEqual(tooltipState, newTooltipData)) setToolTipState(newTooltipData)
                },
            }
        },
        hover: {
            mode: 'dataset',
            intersect: false,
        }
    }

    useEffect(() => {
        const labels = songChart?.chart?.times?.filter(item => item.hour % 2 == 0).map(item => `${item.hour}:00`)
        const datasets = []
        for (let i = 0; i <= 2; i++) {
            datasets.push({
                data: songChart?.chart?.items[Object.keys(songChart?.chart?.items)[i]]?.filter(item => item.hour % 2 == 0)?.map(item => item.counter),
                borderColor: i === 0 ? '#4A7ED0' : i === 1 ? '#27BD9C' : '#E35050',
                tension: 0.2,
                borderWidth: 2,
                pointBackgroundColor: '#ffff',
                pointHoverRadius: 5,
                pointBorderColor: i === 0 ? '#4A7ED0' : i === 1 ? '#27BD9C' : '#E35050',
                pointHoverBorderWidth: 3,
            })
        }

        const set = setTimeout(() => {
            setData({labels, datasets})
        }, 500);

        return () => clearTimeout(set)
    }, [songChart.chart]) 

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

                <div className={clsx(styles.wrapChart)}>
                    {data && <Line data={data} options={options} />}
                    <div 
                        className={clsx(styles.toolTip)} 
                        style={{top: tooltipState.top, left: tooltipState.left, display: tooltipState.display, position: 'absolute'}}
                    >
                        <InforSong item={songChart?.items?.find(item => item.encodeId === tooltipState.encodeId)} sizeM/>
                        <span className={clsx(styles.tooltipPercent)}>
                            {`${Math.round(songChart?.items?.find(item => item.encodeId === tooltipState.encodeId)?.score / songChart?.chart?.totalScore * 100)}%`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongChart