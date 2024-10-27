import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import { RewardImg } from '../Icons';
const cx = classNames.bind(styles);
function SuggestedAccounts({ label }) {
    return (
        <strong>
            <div className={cx('wrapper')}></div>
            <div>
                <p className={cx('label')}>{label}</p>
                <AccountItem />
            </div>
            <div className={cx('wrapper')}></div>
            <div className={cx('holdergram')}>
                <div>
                    <a
                        className={cx('reward')}
                        href="https://effecthouse.tiktok.com/download?utm_campaign=ttweb_entrance_v1&utm_source=tiktok_webapp_main"
                    >
                        <div className={cx('img-reward')}>
                            <RewardImg />
                            <h4 className={cx('title-reward')}>Create TikTok effects, get a reward</h4>
                        </div>
                    </a>
                </div>

                <div className={cx('link')}>
                    <div className={cx('links')}>
                        <a href="#!" className={cx('link-item')}>
                            <h4 className={cx('title-link')}>Company</h4>
                        </a>
                        <a href="#!" className={cx('link-item')}>
                            <h4 className={cx('title-link')}>Program</h4>
                        </a>
                        <a href="#!" className={cx('link-item')}>
                            <h4 className={cx('title-link')}>Terms & Policies</h4>
                        </a>
                    </div>
                    <span className={cx('span-copyright')}>© 2024 TikTok</span>
                </div>
            </div>
        </strong>
    );
}
SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};
export default SuggestedAccounts;
