import styles from './HomeUpload.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)
function HomeUpload() {
    return(
        <div className={cx('wrapper')}>
            <h2>Home Upload</h2>
        </div>
    )
}

export default HomeUpload;
