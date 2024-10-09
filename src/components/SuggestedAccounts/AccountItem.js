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
                        src="https://p9-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/aae8d4e0d8c63731b164fc425bc887d7.jpeg?lk3s=30310797&amp;nonce=2904&amp;refresh_token=30232283f748e56f988ad0638fb3cc34&amp;x-expires=1726714800&amp;x-signature=5fSkM%2FYEnXsb6KpjWKPdmowbJ7o%3D&amp;shp=30310797&amp;shcp=-"
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
