import { useState } from 'react';
import {
    AddIcon,
    CommentIcon,
    HeartActiveIcon,
    HeartIcon,
    LikeActionIcon,
    LikeIcon,
    ShareIcon,
} from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './ActionItem.module.scss';

const cx = classNames.bind(styles);
const ActionItem = ({ avatars, hearts, comments, likes, shares }) => {
    // Trạng thái cho icon và animation
    const [isHeartActive, setIsHeartActive] = useState(false);
    const [isLikeActive, setIsLikeActive] = useState(false);
    const [isAnimatingHeart, setIsAnimatingHeart] = useState(false);
    const [isAnimatingLike, setIsAnimatingLike] = useState(false);

    const handleHeartClick = () => {
        setIsHeartActive(!isHeartActive);
        setIsAnimatingHeart(true);
        setTimeout(() => setIsAnimatingHeart(false), 500); // Dừng animation sau 0.5 giây
    };

    const handleLikeClick = () => {
        setIsLikeActive(!isLikeActive);
        setIsAnimatingLike(true);
        setTimeout(() => setIsAnimatingLike(false), 500); // Dừng animation sau 0.5 giây
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar-wrapper')}>
                {!avatars || !avatars.src ? (
                    <div> </div>
                ) : (
                    <img className={cx('avatar-icon')} src={avatars.src} alt={avatars.alt} />
                )}
                <button className={cx('submit')}>
                    <AddIcon />
                </button>
            </div>
            <div className={cx('container-wrapper')} onClick={handleHeartClick}>
                <div className={cx('icon-wrapper', { animate: isAnimatingHeart })}>
                    {isHeartActive ? <HeartActiveIcon /> : <HeartIcon />}
                </div>
                <strong className={cx('heart')}>{hearts}</strong>
            </div>

            <div className={cx('container-wrapper')}>
                <div className={cx('icon-wrapper')}>
                    <CommentIcon />
                </div>
                <strong className={cx('comment')}>{comments}</strong>
            </div>

            <div className={cx('container-wrapper')} onClick={handleLikeClick}>
                <div className={cx('icon-wrapper', { animate: isAnimatingLike })}>
                    {isLikeActive ? <LikeActionIcon /> : <LikeIcon />}
                </div>
                <strong className={cx('like')}>{likes}</strong>
            </div>

            <div className={cx('container-wrapper')}>
                <div className={cx('icon-wrapper')}>
                    <ShareIcon />
                </div>
                <strong className={cx('share')}>{shares}</strong>
            </div>
        </div>
    );
};

export default ActionItem;
