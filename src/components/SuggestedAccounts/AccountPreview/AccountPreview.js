import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/738edd27d879b062ced369c7a7c5f0af.jpeg?lk3s=a5d48078&amp;nonce=74194&amp;refresh_token=9b1e9aaec6396b8924787fa356eb680a&amp;x-expires=1723712400&amp;x-signature=Mc5XKryp%2FEZ92YtEasNKGrk9YuE%3D&amp;shp=a5d48078&amp;shcp=81f88b70"
                    alt=""
                />
                <Button className={cx('follow-btn')} primary small>Follow</Button>
            </div>
            <div className={cx('body')}>    
                <h4 className={cx('nickname')}>
                    <strong>Nguyen Van A</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <div className={cx('name')}>Nguyen Van A</div>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>8.2M </strong>
                    <span className={cx('label')}>Follower</span>
                    <strong className={cx('value')}>18.2M </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
