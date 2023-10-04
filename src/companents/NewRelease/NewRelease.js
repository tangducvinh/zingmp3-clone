import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

import styles from './NewRelease.module.scss'
import { Button } from '../Button'
import icons from '../../ultis/icon'
import { InforSong } from '../InforSong'
import * as actions from '../../store/action'

function NewRelease() {
    const { HiOutlineChevronRight } = icons
    const { newRelease } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const [ data, setData ] = useState([])
    const [ active, setActive ] = useState(0)

    useEffect(() => {
        if(active === 0) {
            setData(newRelease?.items?.all)
        } else if(active === 1) {
            setData(newRelease?.items?.vPop)
        } else {
            setData(newRelease?.items?.others)
        } 
    }, [active, newRelease])

    function handleChooseSong(item, index) {
        dispatch(actions.setCurSongId(item.encodeId, index))
        dispatch(actions.play(true))
    }

    return (
        <div className={clsx(styles.container)}>
            <h1>{newRelease.title}</h1>

            <div className={clsx(styles.option)}>
                <div className={clsx(styles.wrapBtn)}>
                    <div 
                        className={clsx(styles.btnAll, {[styles.active]: active === 0})}
                        onClick={() => setActive(0)}
                    >
                        <Button item={{text: "Tất cả"}}></Button>
                    </div>
                    <div 
                        className={clsx(styles.btnVn, {[styles.active]: active === 1})}
                        onClick={() => setActive(1)}
                    >
                        <Button item={{text: "Việt Nam"}}></Button>
                    </div>
                    <div 
                        className={clsx(styles.btnOther, {[styles.active]: active === 2})}
                        onClick={() => setActive(2)}
                    >
                        <Button item={{text: "Quốc Tế"}}></Button>
                    </div>
                </div>

                <Link
                    className={clsx(styles.linkAll)}
                    to={newRelease.link}
                >
                    <span>TẤT CẢ</span>
                    <span><HiOutlineChevronRight size={20}/></span>
                </Link>
            </div>

            <div className={clsx(styles.content)}>
                <div className={clsx(styles.wrapInforSong)}>
                    {data?.map((item, index) => 
                        (index <= 3 &&
                            <div 
                                key={item.encodeId}
                                className={clsx(styles.inforSong)}
                                onClick={() => handleChooseSong(item, index)}
                            >
                                <InforSong sizeL item={item} time></InforSong>
                            </div>
                        )
                    )}
                </div>

                <div className={clsx(styles.wrapInforSong)}>
                    {data?.map((item, index) => 
                        ((index > 3 && index <= 7) &&
                            <div 
                                key={item.encodeId}
                                className={clsx(styles.inforSong)}
                                onClick={() => handleChooseSong(item, index)}
                            >
                                <InforSong sizeL item={item} time></InforSong>
                            </div>
                        )
                    )}
                </div>

                <div className={clsx(styles.wrapInforSong)}>
                    {data?.map((item, index) => 
                        ((index > 7 && index <= 11) &&
                            <div 
                                key={item.encodeId}
                                className={clsx(styles.inforSong)}
                                onClick={() => handleChooseSong(item, index)}
                            >
                                <InforSong sizeL item={item} time></InforSong>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewRelease

