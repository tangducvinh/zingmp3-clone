import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import styles from './Item.module.scss'
import icons from '../../ultis/icon'

function ItemTheme({ data }) {
    const { HiOutlineChevronRight } = icons
    const navigate = useNavigate()

    function handleChooseAlbum(link) {
        const path = link.split('.')[0]
        navigate(path)
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapTitle)}>
                <h1 className={clsx(styles.title)}>{data.title}</h1>

                {data.link ? 
                    <Link 
                        className={clsx(styles.link)}
                        to={data.link}
                    >
                        <span>TẤT CẢ</span>
                        <span><HiOutlineChevronRight size={16} /></span>
                    </Link> : ''}
            </div>

            <div className={clsx(styles.content)}>
                {data?.items?.map((item, index) => (
                    index < 5 ?
                        <div 
                        className={clsx(styles.wrapItem)}
                        key={item.encodeId}
                    >
                        <div 
                            className={clsx(styles.wrapImg)}
                            onClick={() => handleChooseAlbum(item.link)}
                        >
                            <img className={clsx(styles.img)} src={item.thumbnail} alt='image'></img>
                        </div>

                        <span className={clsx(styles.description)}>
                            {item.sortDescription.length > 50 ? `${item.sortDescription.slice(0, 50)} ...` : item.sortDescription}
                        </span>
                    </div> : ""
                ))}
            </div>
        </div>
    )
}

export default ItemTheme