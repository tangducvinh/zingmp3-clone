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
    const btnAllElement = useRef()
    const btnVnElement = useRef()
    const btnOtherElement = useRef()
    const [ data, setData ] = useState(newRelease.items?.all)

    useEffect(() => {
        btnAllElement.current.classList.add(styles.active)
    }, [])

    function handleChooseSong(item, index) {
        dispatch(actions.setCurSongId(item.encodeId, index))
        dispatch(actions.play(true))
    }
    
    function handleChosseBtnAll() {
        btnAllElement.current.classList.add(styles.active)
        btnVnElement.current.classList.remove(styles.active)
        btnOtherElement.current.classList.remove(styles.active)
        setData(newRelease.items?.all)
    }

    function handleChooseBtnVn() {
        btnVnElement.current.classList.add(styles.active)
        btnAllElement.current.classList.remove(styles.active)
        btnOtherElement.current.classList.remove(styles.active)
        setData(newRelease.items?.vPop)
    }

    function handleChooseBtnOther() {
        btnOtherElement.current.classList.add(styles.active)
        btnVnElement.current.classList.remove(styles.active)
        btnAllElement.current.classList.remove(styles.active)
        setData(newRelease.items?.others)
    }

    return (
        <div className={clsx(styles.container)}>
            <h1>{newRelease.title}</h1>

            <div className={clsx(styles.option)}>
                <div className={clsx(styles.wrapBtn)}>
                    <div 
                        className={clsx(styles.btnAll)}
                        ref={btnAllElement}
                        onClick={handleChosseBtnAll}
                    >
                        <Button item={{text: "Tất cả"}}></Button>
                    </div>
                    <div 
                        className={clsx(styles.btnVn)}
                        ref={btnVnElement}
                        onClick={handleChooseBtnVn}
                    >
                        <Button item={{text: "Việt Nam"}}></Button>
                    </div>
                    <div 
                        className={clsx(styles.btnOther)}
                        ref={btnOtherElement}
                        onClick={handleChooseBtnOther}
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
                        (index <= 3 ?
                            <div 
                                key={item.encodeId}
                                className={clsx(styles.inforSong)}
                                onClick={() => handleChooseSong(item, index)}
                            >
                                <InforSong sizeL item={item}></InforSong>
                            </div> : ''
                        )
                    )}
                </div>

                <div className={clsx(styles.wrapInforSong)}>
                    {data?.map((item, index) => 
                        ((index > 3 && index <= 7) ?
                            <div 
                                key={item.encodeId}
                                className={clsx(styles.inforSong)}
                                onClick={() => handleChooseSong(item, index)}
                            >
                                <InforSong sizeL item={item}></InforSong>
                            </div> : ''
                        )
                    )}
                </div>

                <div className={clsx(styles.wrapInforSong)}>
                    {data?.map((item, index) => 
                        ((index > 7 && index <= 11) ?
                            <div 
                                key={item.encodeId}
                                className={clsx(styles.inforSong)}
                                onClick={() => handleChooseSong(item, index)}
                            >
                                <InforSong sizeL item={item}></InforSong>
                            </div> : ''
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewRelease

