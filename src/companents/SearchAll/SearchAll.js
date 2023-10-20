import clsx from 'clsx'
import { useEffect } from 'react'

import styles from './SearchAll.module.scss'
import * as apis from '../../apis'


function SearchAll() {
    return (
        <div clsx={clsx(styles.container)}>
            <h1>Search All</h1>
        </div>
    )
}

export default SearchAll