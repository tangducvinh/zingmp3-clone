import clsx from 'clsx'
import { useSelector } from 'react-redux'

import styles from './SearchArtist.module.scss'
import { ItemArtist } from '../ItemArtist'
import { LibrarySongEmpty } from '../LibrarySongEmpty'

function SearchArtist() {
    const { dataSearch } = useSelector(state => state.music)

    return (
        <div className={clsx(styles.container)}>
            {dataSearch?.data?.data?.artists?.length > 0 ?
                <>
                    <h1 className={clsx(styles.titleName)}>Nghệ Sĩ/OA</h1>

                    <div className={clsx(styles.wrapArtists)}>
                        {dataSearch?.data?.data?.artists?.map(item => (
                            <div 
                                className={clsx(styles.wrapItem)}
                                key={item.id}
                            >
                                <ItemArtist item={item}/>
                            </div>
                        ))}
                    </div>
                </>
                :
                    <LibrarySongEmpty />
            }
        </div>
    )
}

export default SearchArtist