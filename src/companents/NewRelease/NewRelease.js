import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

import styles from './NewRelease.module.scss'
import { Button } from '../Button'
import { InforSong } from '../InforSong'
import * as actions from '../../store/action'
import { LinkAll } from '../LinkAll'

function NewRelease() {
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
        dispatch(actions.setRecentPlaylist(item))
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

                <LinkAll path={newRelease.link}></LinkAll>
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
                                <InforSong sizeL item={item} time play></InforSong>
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
                                <InforSong sizeL item={item} time play></InforSong>
                            </div>
                        )
                    )}
                </div>

                <div className={clsx(styles.wrapInforSong, styles.hidden)}>
                    {data?.map((item, index) => 
                        ((index > 7 && index <= 11) &&
                            <div 
                                key={item.encodeId}
                                className={clsx(styles.inforSong)}
                                onClick={() => handleChooseSong(item, index)}
                            >
                                <InforSong sizeL item={item} time play></InforSong>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewRelease

