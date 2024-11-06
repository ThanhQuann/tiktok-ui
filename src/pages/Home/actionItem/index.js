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

const ActionItem = ({
    avatars,
    hearts: initialHearts,
    comments,
    likes: initialLikes,
    shares,
    videoId,
    isForVideos,
}) => {
    const [isAnimatingHeart, setIsAnimatingHeart] = useState(false);
    const [isAnimatingLike, setIsAnimatingLike] = useState(false);
    const [isHeartActive, setIsHeartActive] = useState(false);
    const [isLikeActive, setIsLikeActive] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hearts, setHearts] = useState(initialHearts);
    const [likes, setLikes] = useState(initialLikes);

    const saveToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    // Lấy trạng thái từ localStorage khi component được mount
    useEffect(() => {
        const savedHeartState = localStorage.getItem(`isHeartActive_${videoId}_${isForVideos ? 'videos' : 'video'}`);
        const savedLikeState = localStorage.getItem(`isLikeActive_${videoId}_${isForVideos ? 'videos' : 'video'}`);
        const savedHearts = localStorage.getItem(`hearts_${videoId}_${isForVideos ? 'videos' : 'video'}`);
        const savedLikes = localStorage.getItem(`likes_${videoId}_${isForVideos ? 'videos' : 'video'}`);
        const savedSubmitted = localStorage.getItem(`isSubmitted_${videoId}`);

        if (savedHeartState !== null) setIsHeartActive(JSON.parse(savedHeartState));
        if (savedLikeState !== null) setIsLikeActive(JSON.parse(savedLikeState));
        if (savedHearts !== null) setHearts(JSON.parse(savedHearts));
        if (savedLikes !== null) setLikes(JSON.parse(savedLikes));
        if (savedSubmitted !== null) setIsSubmitted(JSON.parse(savedSubmitted));
    }, [videoId, isForVideos]);

    const formatNumber = (number) => {
        return number > 999999
            ? parseFloat((number / 1000000).toFixed(1)) + 'M'
            : number > 9999
            ? parseFloat((number / 1000).toFixed(1)) + 'K'
            : number;
    };

    const handleHeartClick = () => {
        const newState = !isHeartActive;
        const newHearts = newState ? hearts + 1 : hearts - 1;
        setIsHeartActive(newState);
        setHearts(newHearts);
        saveToLocalStorage(`isHeartActive_${videoId}_${isForVideos ? 'videos' : 'video'}`, newState);
        saveToLocalStorage(`hearts_${videoId}_${isForVideos ? 'videos' : 'video'}`, newHearts);
        setIsAnimatingHeart(true);
        setTimeout(() => setIsAnimatingHeart(false), 500);
    };

    const handleLikeClick = () => {
        const newState = !isLikeActive;
        const newLikes = newState ? likes + 1 : likes - 1;
        setIsLikeActive(newState);
        setLikes(newLikes);
        saveToLocalStorage(`isLikeActive_${videoId}_${isForVideos ? 'videos' : 'video'}`, newState);
        saveToLocalStorage(`likes_${videoId}_${isForVideos ? 'videos' : 'video'}`, newLikes);
        setIsAnimatingLike(true);
        setTimeout(() => setIsAnimatingLike(false), 500);
    };
    const handleSubmit = () => {
        const newState = !isSubmitted;
        saveToLocalStorage(`isSubmitted_${videoId}`, newState);
        setIsSubmitted(newState);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar-wrapper')}>
                {!avatars || !avatars.src ? null : (
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
                <strong className={cx('heart')}>{formatNumber(hearts)}</strong>
            </div>

            <div className={cx('container-wrapper')}>
                <div className={cx('icon-wrapper')}>
                    <CommentIcon />
                </div>
                <strong className={cx('comment')}>{formatNumber(comments)}</strong>
            </div>

            <div className={cx('container-wrapper')} onClick={handleLikeClick}>
                <div className={cx('icon-wrapper', { animate: isAnimatingLike })}>
                    {isLikeActive ? <LikeActionIcon /> : <LikeIcon />}
                </div>
                <strong className={cx('like')}>{formatNumber(likes)}</strong>
            </div>

            <div className={cx('container-wrapper')}>
                <div className={cx('icon-wrapper')}>
                    <ShareIcon />
                </div>
                <strong className={cx('share')}>{formatNumber(shares)}</strong>
            </div>
        </div>
    );
};

export default ActionItem;
