import classNames from 'classnames/bind';
import styles from './SidebarUpload.module.scss';
import Menu, { MenuItem } from './MenuUpload';
import config from '~/config';
import {
    CreatorIcon,
    FeedbackIcon,
    FeedbackIconActive,
    HorizontalLineIcon,
    HorizontalLineIconActive,
    InheritIcon,
    InheritIconActive,
    LineChartIcon,
    LineChartIconActive,
    SoundIcon,
    SoundIconActive,
    UploadCommentIcon,
    UploadCommentIconActive,
    UploadHomeIcon,
    UploadHomeIconActive,
} from '~/components/Icons';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const cx = classNames.bind(styles);

function SidebarUpload() {
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    const handleClick = () => {
        setIsActive(true);
    };
    useEffect(() => {
        if (location.pathname !== config.routes.upload) {
            setIsActive(false);
        }
    }, [location]);
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('Sidebar-index')}>
                <div>
                    <NavLink to={config.routes.upload}>
                        <button
                            onClick={handleClick}
                            disabled={isActive}
                            className={cx('Upload', { active: isActive })}
                        >
                            Upload
                        </button>
                    </NavLink>
                    <Menu>
                        <MenuItem
                            title="Home"
                            to={config.routes.homeUpload}
                            icon={<UploadHomeIcon />}
                            activeIcon={<UploadHomeIconActive />}
                        />
                        <MenuItem
                            title="Posts"
                            to={config.routes.post}
                            icon={<HorizontalLineIcon />}
                            activeIcon={<HorizontalLineIconActive />}
                        />
                        <MenuItem
                            title="Comments"
                            to={config.routes.comment}
                            icon={<UploadCommentIcon />}
                            activeIcon={<UploadCommentIconActive />}
                        />
                        <MenuItem
                            title="Analytics"
                            to={config.routes.analytics}
                            icon={<LineChartIcon />}
                            activeIcon={<LineChartIconActive />}
                        />
                        <MenuItem
                            title="Inspirations"
                            to={config.routes.inspirations}
                            icon={<InheritIcon />}
                            activeIcon={<InheritIconActive />}
                        />
                        <MenuItem
                            title="Unlimited sounds"
                            to={config.routes.unlimitedsounds}
                            icon={<SoundIcon />}
                            activeIcon={<SoundIconActive />}
                        />
                        <MenuItem
                            title="Creator Academy"
                            to={config.routes.create}
                            icon={<CreatorIcon />}
                            activeIcon={<CreatorIcon />}
                        />
                        <MenuItem
                            title="Feedback"
                            to={config.routes.feedback}
                            icon={<FeedbackIcon />}
                            activeIcon={<FeedbackIconActive />}
                        />
                    </Menu>
                    <div className={cx('Hidden-Screen-Bottom')}>
                        <Link className={cx('ToHome')} to={config.routes.home}>
                            Back to TikTok
                        </Link>
                        <div className={cx('footer')}>
                            <a
                                href="https://www.tiktok.com/legal/page/row/terms-of-service/en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cx('title')}
                            >
                                Terms of Service
                            </a>
                            <a
                                href="https://www.tiktok.com/legal/page/row/privacy-policy/en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cx('title')}
                            >
                                Privacy Policy
                            </a>
                            <span className={cx('title')}>Copyright © 2024 TikTok</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default SidebarUpload;
