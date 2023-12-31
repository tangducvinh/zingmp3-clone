import clsx from 'clsx'
import { Link } from 'react-router-dom'

import styles from './LibrarySongEmpty.module.scss'
import icons from '../../ultis/icon'
import { Button } from '../Button'
import path from '../../ultis/path'

function LibrarySongEmpty() {
    const { SiMusicbrainz } = icons
    
    return (
        <div className={clsx(styles.container)}>
            <SiMusicbrainz size={70} color={'white'}/>
            <p className={clsx(styles.textAnnouncement)}>Chưa có bài hát trong thư viện</p>
            <Link 
                className={clsx(styles.btnDiscover)}
                to={`/${path.NEW_RANK}`}
            >
                <Button item={{text: 'KHÁM PHÁ NGAY'}}/>
            </Link>
        </div>
    )
}

export default LibrarySongEmpty