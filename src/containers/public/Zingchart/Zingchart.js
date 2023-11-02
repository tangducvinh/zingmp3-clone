import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'

import styles from './Zingchart.module.scss'
import icons from '../../../ultis/icon'
import * as actions from '../../../store/action'
import { ChartItem } from '../../../companents/ChartItem'
import { SongItem } from '../../../companents/SongItem'
import { Button } from '../../../companents/Button'
import { CountrySong } from '../../../companents/CountrySong'

function Zingchart() {
    const { HiPlay } = icons
    const dispatch = useDispatch()
    const { dataZingchart } = useSelector(state => state.music)
    const [ dataPlaylist, setDataPlaylist ] = useState(dataZingchart?.newRelease)
    const [ status, setStatus ] = useState(false)
    const ref = useRef()

    useEffect(() => {
        dispatch(actions.getDataZingchart())
        ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }, [])

    function handleShowPlaylist() {
        setDataPlaylist(dataZingchart?.RTChart?.items)
        setStatus(true)
    }

    function handleChooseSong(item, index) {
        dispatch(actions.setCurSongId(item.encodeId, index))
        dispatch(actions.play(true))
        dispatch(actions.setRecentPlaylist(item))
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapTitle)} ref={ref}>
                <h1 className={clsx(styles.nameTitle)}>#zingchart</h1>
                <span 
                    className={clsx(styles.wrapIconPlay)}
                >
                    <HiPlay size={23} />
                </span>
            </div>

            <div className={clsx(styles.chart)}>
                <ChartItem dataChart={dataZingchart?.RTChart} />
            </div> 

            <div className={clsx(styles.playlist)}>
                {dataPlaylist?.map((item, index) => 
                    <div 
                        className={clsx(styles.song)}
                        onClick={() => handleChooseSong(item, index)}
                        key={index}
                    >
                        <SongItem item={item} index={index} zingchart/>
                    </div>
                )}
            </div>

            <div className={clsx(styles.wrapBtn, {[styles.active]: status})}>
                <div 
                    className={clsx(styles.btnAdd)}
                    onClick={handleShowPlaylist}
                >
                    <Button item={{text: 'Xem top 100'}}/>
                </div>
            </div>

            <div className={clsx(styles.rank)}>
                <h1 className={clsx(styles.rankTitle)}>Bảng Xếp Hạng Tuần</h1>
                <div className={clsx(styles.content)}>
                    <div className={clsx(styles.countrySong)}>
                        <CountrySong data={dataZingchart?.weekChart?.vn}/>
                    </div>

                    <div className={clsx(styles.countrySong)}>
                        <CountrySong data={dataZingchart?.weekChart?.us}/>
                    </div>

                    <div className={clsx(styles.countrySong)}>
                        <CountrySong data={dataZingchart?.weekChart?.korea}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Zingchart