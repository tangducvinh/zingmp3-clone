import clsx from 'clsx'
import styles from './InforArtistSearch.module.scss'
import { Link } from 'react-router-dom'

import { handleNumber } from '../../ultis/func'


function InforArtistSearch({image, name, role, total, link, onSetShowSearch}) {
    return (
        <Link to={link} className={clsx(styles.container)} onClick={() => onSetShowSearch(false)}>
            <img src={image} alt='avatar' className={clsx(styles.imgArtist)}></img>

            <div className={clsx(styles.wrapInfor)}>
                <h3 className={clsx(styles.nameArtist)}>{name}</h3>
                <p className={clsx(styles.inforArtist)}>{`${role} - ${handleNumber(total)}`}</p>
            </div>
        </Link>
    )
}

export default InforArtistSearch