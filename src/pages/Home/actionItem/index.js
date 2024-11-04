import { useState, useEffect } from 'react';
import {
    AddIcon,
    CommentIcon,
    HeartActiveIcon,
    HeartIcon,
    LikeActionIcon,
    LikeIcon,
    ShareIcon,
    TickIcon,
} from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './ActionItem.module.scss';

const cx = classNames.bind(styles);

const ActionItem = ({ avatars, hearts, comments, likes, shares, videoId }) => {
    // Trạng thái cho icon và animation
    const [isAnimatingHeart, setIsAnimatingHeart] = useState(false);
    const [isAnimatingLike, setIsAnimatingLike] = useState(false);
    const [isHeartActive, setIsHeartActive] = useState(false);
    const [isLikeActive, setIsLikeActive] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Hàm lưu trạng thái vào localStorage
    const saveToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    // Lấy trạng thái từ localStorage khi component được mount
    useEffect(() => {
        const savedHeartState = localStorage.getItem(`isHeartActive_${videoId}`);
        const savedLikeState = localStorage.getItem(`isLikeActive_${videoId}`);
        const saveSubmitted = localStorage.getItem(`isSubmitted${videoId}`);

        if (savedHeartState !== null) setIsHeartActive(JSON.parse(savedHeartState));
        if (savedLikeState !== null) setIsLikeActive(JSON.parse(savedLikeState));
        if (saveSubmitted !== null) setIsSubmitted(JSON.parse(saveSubmitted));
    }, [videoId]);

    const handleHeartClick = () => {
        setIsHeartActive((prev) => {
            const newState = !prev;
            saveToLocalStorage(`isHeartActive_${videoId}`, newState);
            return newState;
        });
        setIsAnimatingHeart(true);
        setTimeout(() => setIsAnimatingHeart(false), 500); // Dừng animation sau 0.5 giây
    };

    const handleLikeClick = () => {
        setIsLikeActive((prev) => {
            const newState = !prev;
            saveToLocalStorage(`isLikeActive_${videoId}`, newState);
            return newState;
        });
        setIsAnimatingLike(true);
        setTimeout(() => setIsAnimatingLike(false), 500); // Dừng animation sau 0.5 giây
    };
    const handleSubmit = () => {
        setIsSubmitted((prev) => {
            const newState = !prev;
            saveToLocalStorage(`isSubmitted${videoId}`, newState);
            return newState;
        });
        setIsSubmitted(!isSubmitted);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar-wrapper')}>
                {!avatars || !avatars.src ? (
                    <></>
                ) : (
                    <img className={cx('avatar-icon')} src={avatars.src} alt={avatars.alt} />
                )}
                <button onClick={handleSubmit} className={cx('submit', { submitted: isSubmitted })}>
                    {!isSubmitted ? <AddIcon className={cx('add-icon')} /> : <TickIcon className={cx('tick-icon')} />}
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
