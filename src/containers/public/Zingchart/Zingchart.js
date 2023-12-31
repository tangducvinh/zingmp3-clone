import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'

import styles from './Zingchart.module.scss'
import icons from '../../../ultis/icon'
import * as actions from '../../../store/action'
import { ChartItem } from '../../../companents/ChartItem'
import { Button } from '../../../companents/Button'
import { CountrySong } from '../../../companents/CountrySong'
import { RankSongPlaylist } from '../../../companents/RankSongPlaylist'
import { Mutating } from '../../../companents/Spinner'

function Zingchart() {
    const { HiPlay } = icons
    const dispatch = useDispatch()
    const { dataZingchart } = useSelector(state => state.music)
    const { isLoadingZingchart } = useSelector(state => state.play)
    const [ dataPlaylist, setDataPlaylist ] = useState(dataZingchart?.newRelease)
    const [ status, setStatus ] = useState(false)
    const ref = useRef()

    useEffect(() => {
        if(ref.current) ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }, [])

    function handleShowPlaylist() {
        setDataPlaylist(dataZingchart?.RTChart?.items)
        setStatus(true)
    }

    return (
        <>
            {isLoadingZingchart ? 
                <div className={clsx(styles.loading)}><Mutating /></div>    
            :
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
                        <RankSongPlaylist data={dataPlaylist}/>
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
            }
        </>
    )
}

export default Zingchart