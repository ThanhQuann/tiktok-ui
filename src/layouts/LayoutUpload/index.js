import classNames from 'classnames/bind';
import styles from './LayoutUpload.module.scss';
import SidebarUpload from '../components/SidebarUpload';
import HeaderUpload from '../components/HeaderUpload';
const cx = classNames.bind(styles);
function LayoutUpload({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderUpload />
            <div className={cx('container')}>
                <div>
                    <SidebarUpload />
                </div>
                <div className={cx('bg-content')}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default LayoutUpload;
