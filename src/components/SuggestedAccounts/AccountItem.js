import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
// import PropTypes from 'prop-types';
import styles from './SuggestedAccounts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview';
const cx = classNames.bind(styles);
function AccountItem() {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview />
                </PopperWrapper>
            </div>
        );
    };
    return (
        <div>
            <Tippy interactive delay={[800, 0]} offset={[-20, 0]} render={renderPreview} placement="bottom">
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        loading="lazy"
                        alt=""
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                    />

                    <div className={cx('item-info')}>
                        <h4 className={cx('nickname')}>
                            <strong>Pho Hong Tuyet</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </h4>
                        <div className={cx('name')}>Pho Hong Tuyet</div>
                    </div>
                </div>
            </Tippy>
            <Tippy interactive delay={[800, 0]} offset={[-20, 0]} render={renderPreview} placement="bottom">
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        loading="lazy"
                        alt=""
                        src="https://randomuser.me/api/portraits/men/3.jpg"
                    />

                    <div className={cx('item-info')}>
                        <h4 className={cx('nickname')}>
                            <strong>Mi Nguyet Tam</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </h4>
                        <div className={cx('name')}>Mi Nguyet Tam</div>
                    </div>
                </div>
            </Tippy>
            <Tippy interactive delay={[800, 0]} offset={[-20, 0]} render={renderPreview} placement="bottom">
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        loading="lazy"
                        alt=""
                        src="https://randomuser.me/api/portraits/men/4.jpg"
                    />

                    <div className={cx('item-info')}>
                        <h4 className={cx('nickname')}>
                            <strong>Tieu Ly Phi Dao</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </h4>
                        <div className={cx('name')}>Tieu Ly Phi Dao</div>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}
AccountItem.propTypes = {};
export default AccountItem;
