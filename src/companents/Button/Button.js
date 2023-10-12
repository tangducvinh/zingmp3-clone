import clsx from 'clsx'

import styles from './Button.module.scss'

function Button({item, sizeM}) {
    return (
        <div className={clsx(styles.container)}>
            {item.icon ? <span className={clsx(styles.icon)}>{item.icon}</span> : ''}
            <span className={clsx(styles.text, {[styles.textM]: sizeM})}>{item.text}</span>
        </div>
    )
}

export default Button