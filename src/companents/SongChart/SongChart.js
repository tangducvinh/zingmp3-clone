import clsx from 'clsx'
import { memo } from 'react'
import { Link } from 'react-router-dom'

import styles from './SongChart.module.scss'
import icons from '../../ultis/icon'
import { InforSong } from '../InforSong'
import { Button } from '../Button'
 
function SongChart({ data }) {
    const { BsPlayCircleFill } = icons
    console.log(data)
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
                    {data?.items?.filter((item, index) => index <= 2).map((item, index) => (
                        <div className={clsx(styles.inforSong)}>
                            <span className={clsx(styles.orderIndex)}>{index + 1}</span>
                            <InforSong item={item} sizeL />
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
                </div>
            </div>
        </div>
    )
}

export default memo(SongChart)