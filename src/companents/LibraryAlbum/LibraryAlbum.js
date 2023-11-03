import clsx from 'clsx'

import styles from './LibraryAlbum.module.scss'
import icons from '../../ultis/icon'

function LibraryAlbum() {
    const { MdFeaturedPlayList } = icons
    
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.empty)}>
                <MdFeaturedPlayList size={70} color={'white'}/>
                <p className={clsx(styles.textAnnouncement)}>Chưa có album trong thư viện</p>
            </div>
        </div>
    )
}

export default LibraryAlbum