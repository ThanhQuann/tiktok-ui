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
            <Tippy  interactive delay={[800, 0]}  offset={[-20, 0]} render={renderPreview} placement="bottom">
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        loading="lazy"
                        alt=""
                        src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/738edd27d879b062ced369c7a7c5f0af.jpeg?lk3s=a5d48078&amp;nonce=74194&amp;refresh_token=9b1e9aaec6396b8924787fa356eb680a&amp;x-expires=1723712400&amp;x-signature=Mc5XKryp%2FEZ92YtEasNKGrk9YuE%3D&amp;shp=a5d48078&amp;shcp=81f88b70"
                    />
                    <div className={cx('item-info')}>
                        <h4 className={cx('nickname')}>
                            <strong>Nguyen Van A</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </h4>
                        <div className={cx('name')}>Nguyen Van A</div>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}
AccountItem.propTypes = {};
export default AccountItem;
