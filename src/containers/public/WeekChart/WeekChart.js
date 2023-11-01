import clsx from 'clsx'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import styles from './WeekChart.module.scss'
import icons from '../../../ultis/icon'
import * as actions from '../../../store/action'

function WeekChart() {
    const { HiPlay } = icons
    const { dataZingchart, curSongId } = useSelector(state => state.music)
    const { isPlaying, } = useSelector(state => state.play)
    const { id } = useParams()
    const dispatch = useDispatch()

    function handlePlaySong() {
        let data;
        if (id === 'IWZ9Z08I') data = dataZingchart?.weekChart?.vn
        else if (id === 'IWZ9Z0BW') data = dataZingchart?.weekChart?.us
        else data = dataZingchart?.weekChart?.korea

        if (id !== data.items[0].encodeId && data.items[0].encodeId !== curSongId) {
            dispatch(actions.setCurSongId(data.items[0].encodeId))
            dispatch(actions.play(true))    
            dispatch(actions.setRecentPlaylist(data.items[0]))
            return
        }
        dispatch(actions.play(!isPlaying))
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapTitle)}>
                <h1 className={clsx(styles.titleName)}>Bảng Xếp Hạng Tuần</h1>
                <span 
                    className={clsx(styles.wrapBtnPlay)}
                    onClick={handlePlaySong}
                >
                    <HiPlay size={25}/>
                </span>
            </div>

            <div className={clsx(styles.wrapOption)}>
                <NavLink 
                    className={({isActive}) => isActive ? styles.optionNameActive : styles.optionName}
                    to={'/zing-chart-tuan/Bai-hat-Viet-Nam/IWZ9Z08I'}
                >
                    VIỆT NAM
                </NavLink>

                <NavLink 
                    className={({isActive}) => isActive ? styles.optionNameActive : styles.optionName}
                    to={'/zing-chart-tuan/Bai-hat-US-UK/IWZ9Z0BW'}
                >
                    US-UK
                </NavLink>

                <NavLink 
                    className={({isActive}) => isActive ? styles.optionNameActive : styles.optionName}
                    to={'/zing-chart-tuan/bai-hat-Kpop/IWZ9Z0BO'}
                >
                    K-POP
                </NavLink>
            </div>

            <div className={clsx(styles.outlet)}>
                <Outlet />
            </div>
        </div>
    )
}

export default WeekChart