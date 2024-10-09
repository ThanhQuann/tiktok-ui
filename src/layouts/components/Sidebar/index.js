import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
    LiveIcon,
    LiveActiveIcon,
    ExploreIcon,
    ExploreActiveIcon,
    FriendIcon,
    FriendActionIcon,
    Profile,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
const cx = classNames.bind(styles);
function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            {
                <Menu>
                    <MenuItem
                        title="For You"
                        to={config.routes.home}
                        icon={<HomeIcon />}
                        activeIcon={<HomeActiveIcon />}
                    />
                    <MenuItem
                        title="Explore"
                        to={config.routes.explore}
                        icon={<ExploreIcon />}
                        activeIcon={<ExploreActiveIcon />}
                    />
                    <MenuItem
                        title="Following"
                        to={config.routes.following}
                        icon={<UserGroupIcon />}
                        activeIcon={<UserGroupActiveIcon />}
                    />
                    <MenuItem
                        title="Friends"
                        to={config.routes.friend}
                        icon={<FriendIcon />}
                        activeIcon={<FriendActionIcon />}
                    />
                    <MenuItem
                        title="LIVE"
                        to={config.routes.live}
                        icon={<LiveIcon />}
                        activeIcon={<LiveActiveIcon />}
                    />
                    <MenuItem title="Profile" className={cx('avatar')} to={config.routes.profile} icon={<Profile />} activeIcon={<Profile />} />
                </Menu>
            }
            <SuggestedAccounts label="Following accounts" />
        </aside>
    );
}

export default Sidebar;
