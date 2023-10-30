import clsx from 'clsx'
import chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { useState, useEffect, memo } from 'react'
import _ from 'lodash'

import styles from './ChartItem.module.scss'
import { InforSong } from '../InforSong'

function ChartItem({ dataChart }) {
    const [ data, setData ] = useState()
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
                            data: dataChart.chart.items[Object.keys(dataChart.chart.items)[i]].filter(item => item.hour % 2 === 0).map(item => item.counter),
                            songId: Object.keys(dataChart.chart.items)[i]
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
        const labels = dataChart?.chart?.times?.filter(item => item.hour % 2 == 0).map(item => `${item.hour}:00`)
        const datasets = []
        for (let i = 0; i <= 2; i++) {
            datasets.push({
                data: dataChart?.chart?.items[Object.keys(dataChart?.chart?.items)[i]]?.filter(item => item.hour % 2 == 0)?.map(item => item.counter),
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
    }, [dataChart.chart])

    return (
        <div className={clsx(styles.wrapChart)}>
            {data && <Line data={data} options={options} />}
            <div 
                className={clsx(styles.toolTip)} 
                style={{top: tooltipState.top, left: tooltipState.left, display: tooltipState.display, position: 'absolute'}}
            >
                <InforSong item={dataChart?.items?.find(item => item.encodeId === tooltipState.encodeId)} sizeSM sizeM/>
                <span className={clsx(styles.tooltipPercent)}>
                    {`${Math.round(dataChart?.items?.find(item => item.encodeId === tooltipState.encodeId)?.score / dataChart?.chart?.totalScore * 100)}%`}</span>
            </div>
        </div>
    )
}

export default memo(ChartItem)