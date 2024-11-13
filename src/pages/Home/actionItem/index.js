import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
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

const ActionItem = ({ avatars, hearts: initialHearts, comments, likes: initialLikes, shares, videoId, isSubmit,isLikeActives ,isHeartActives }) => {
    const [isAnimatingHeart, setIsAnimatingHeart] = useState(false);
    const [isAnimatingLike, setIsAnimatingLike] = useState(false);
    const [isHeartActive, setIsHeartActive] = useState(isHeartActives);
    const [isLikeActive, setIsLikeActive] = useState(isLikeActives);
    const [isSubmitted, setIsSubmitted] = useState(isSubmit);
    const [hearts, setHearts] = useState(initialHearts);
    const [likes, setLikes] = useState(initialLikes);

    const apiUrl = 'http://localhost:3005/tiktokstudio/videos'; // Địa chỉ API của bạn
    // Gửi yêu cầu PUT tới API khi thay đổi trạng thái
    const updateVideoData = useCallback(async () => {
        try {
            await axios.put(`${apiUrl}/${videoId}`, {
                hearts,
                likes,
                isHeartActive,
                isLikeActive,
                isSubmitted,
            });
        } catch (error) {
            console.error('Error updating video data:', error);
        }
    }, [videoId, hearts, likes, isHeartActive, isLikeActive, isSubmitted]);

    // Gọi updateVideoData mỗi khi thay đổi trạng thái
    useEffect(() => {
        updateVideoData();
        console.log('updateVideoData');
    }, [updateVideoData]);
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
        setIsAnimatingHeart(true);
        setTimeout(() => setIsAnimatingHeart(false), 500);
    };

    const handleLikeClick = () => {
        const newState = !isLikeActive;
        const newLikes = newState ? likes + 1 : likes - 1;
        setIsLikeActive(newState);
        setLikes(newLikes);
        setIsAnimatingLike(true);
        setTimeout(() => setIsAnimatingLike(false), 500);
    };

    const handleSubmit = () => {
        const newState = !isSubmitted;
        setIsSubmitted(newState);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar-wrapper')}>
                {!avatars ? null : <img className={cx('avatar-icon')} src={avatars} alt={avatars.alt} />}
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
