import { Outlet } from 'react-router-dom'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import Tippy from '@tippyjs/react/headless'
import { useDispatch } from 'react-redux'

import { SidebarLeft } from '../../../companents/SidebarLeft'
import { Header } from '../../../companents/Header'
import { Audio } from '../../../companents/Audio'
import { SidebarRight } from '../../../companents/SidebarRight'
import styles from './Public.module.scss'
import { NoticeVip } from '../../../companents/NoticeVip'
import * as actions from '../../../store/action'

function Public() {
    const { sidebarRight, isShowVip } = useSelector(state => state.play)
    const { curSongId } = useSelector(state => state.music)
    const dispatch = useDispatch()

    
    return (
        <div className={clsx(styles.container)}>
            {isShowVip && <div className={clsx(styles.overlay)}></div>}
            <div className={clsx(styles.wrrapContent)}>
                <div className={clsx(styles.sidebarLeft)}>
                    <SidebarLeft />
                </div>
                
                <div className={clsx(styles.content)}>
                    <div className={clsx(styles.header)}>
                        <Header />
                    </div>

                    <div className={clsx(styles.outlet)}>
                        <Outlet />
                    </div>

                    <div>
                        <Tippy
                            visible={isShowVip}
                            interactive
                            onClickOutside={() => dispatch(actions.setShowVip(false))}
                            render={attrs => (
                                <div className={clsx(styles.tippyNotice)} tabIndex="-1" {...attrs}>
                                    <NoticeVip />
                                </div>
                            )}
                        >
                            <div className={clsx(styles.notice)}></div>
                        </Tippy>
                    </div>

                    {curSongId && <div className={clsx(styles.bottom)}></div>}
                </div>

                <div className={clsx(styles.sidebarRight)}>
                    {sidebarRight && <SidebarRight />}
                </div>
            </div>

            {curSongId && 
                <div className={clsx(styles.audio)}>
                    <Audio />
                </div>
            }
            
        </div>
    )
}

export default Public