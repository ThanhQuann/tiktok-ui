import classNames from 'classnames/bind';
import styles from './HeaderUpload.module.scss';
import { Link } from 'react-router-dom';
import image from '~/asset/images';
import 'tippy.js/dist/tippy.css';
import routes from '~/config/routes';
const cx = classNames.bind(styles);

function HeaderUpload() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={routes.homeUpload} className={cx('logo-link')}>
                    <img src={image.logo} alt="TikTok" />
                    <div className={cx('logo-studio')}>
                        <button className={cx('btn-studio')}>Studio</button>
                    </div>
                </Link>
                <div className={cx('actions')}>
                    <img
                        className={cx('user-avatar')}
                        src="https://media.ngoisao.vn/resize_580/news/2012/6/17/49/e201216209315414fd54a8a5aa14jpg1339897831.jpg"
                        alt="Nguyen Van A"
                    />
                </div>
            </div>
        </header>
    );
}

export default HeaderUpload;
