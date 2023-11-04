import clsx from 'clsx'

import { LibrarySongEmpty } from '../LibrarySongEmpty'
import styles from './LibrarySong.module.scss'

function LibrarySong() {

    return (
        <div className={clsx(styles.container)}>
            <LibrarySongEmpty />
        </div>
    )
}

export default LibrarySong