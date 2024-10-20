import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <img className={cx('avatar')} src="https://randomuser.me/api/portraits/men/1.jpg" alt="" />
                    <Button className={cx('follow-btn')} primary small>
                        Follow
                    </Button>
                </div>
                <div className={cx('body')}>
                    <h4 className={cx('nickname')}>
                        <strong>Pho Hong Tuyet</strong>
                        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                    </h4>
                    <div className={cx('name')}>Pho Hong Tuyet</div>
                    <p className={cx('analytics')}>
                        <strong className={cx('value')}>8.2M </strong>
                        <span className={cx('label')}>Follower</span>
                        <strong className={cx('value')}>18.2M </strong>
                        <span className={cx('label')}>Likes</span>
                    </p>
                </div>
            </div>

     
        </>
    );
}

export default AccountPreview;
