import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { memo, useState, useEffect } from 'react'

import styles from './SearchInfor.module.scss'
import icons from '../../ultis/icon'

function SearchInfor({ onSetData, keywordLive }) {
    const { dataHistoryKeyword } = useSelector(state => state.app)
    const [ status, setStatus ] = useState(0)
    const { BiHistory, TfiSearch } = icons

    useEffect(() => {
        if (keywordLive.length > 0) setStatus(1)
        else setStatus(0)
    }, [keywordLive])

    return (
        <div className={clsx(styles.container)}>
            {status === 0 && 
                <div className={styles.wrapKeywords}>
                    <p className={clsx(styles.title)}>Lịch sử tìm kiếm</p>

                    {dataHistoryKeyword?.map((item, index) => (
                        <div 
                            className={clsx(styles.wrapInforText)}
                            onClick={() => onSetData(item)}
                            key={index}
                        >
                            <BiHistory size={19} color={'gray'}/>
                            <span className={clsx(styles.inforText)}>{item}</span>
                        </div>  
                    ))}
                </div>
            }
 
            {status === 1 && 
                <div className={clsx(styles.wrapKeywordSearch)}>
                    <p className={clsx(styles.title)}>Từ khoá</p>
                    <div 
                        className={clsx(styles.wrapInforText)}
                        onClick={() => onSetData(keywordLive)}
                    >
                        <TfiSearch size={19} color={'gray'}/>
                        <span className={clsx(styles.inforText)}>
                            Tìm kiếm
                            <span className={clsx(styles.textKeyword)}>{` "${keywordLive}"`}</span>
                        </span>
                    </div>
                </div>
            }
        </div>
    )
}

export default memo(SearchInfor)