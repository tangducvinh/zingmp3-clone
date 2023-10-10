import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './SongChart.module.scss'
import icons from '../../ultis/icon'
import { InforSong } from '../InforSong'
import { Button } from '../Button'
import { Line } from 'react-chartjs-2'
import  * as actions from '../../store/action'
 
function SongChart() {
    const { songChart } = useSelector(state => state.app)
    const { BsPlayCircleFill } = icons
    const [ data, setData ] = useState()
    const dispatch = useDispatch()

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

        setData({labels, datasets})
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
                            <span className={clsx(styles.orderIndex)}>{index + 1}</span>
                            <InforSong item={item} sizeL />
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
                    {data && <Line data={data} options={options}/>}
                </div>
            </div>
        </div>
    )
}

export default SongChart