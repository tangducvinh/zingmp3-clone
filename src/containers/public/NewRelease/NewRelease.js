import clsx from 'clsx'
import { useSelector } from 'react-redux'

import styles from './NewRelease.module.scss'


function NewRelease() {
    const { newRelease } = useSelector(state => state.app)

    return (
        <div className={clsx(styles.container)}>
            <h1>New Release</h1>
        </div>
    )
}


export default NewRelease