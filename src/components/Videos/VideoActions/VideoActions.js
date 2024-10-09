import styles from './VideoActions.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function VideoActions({ hearts, likes, comments, shares, avatar, onHeart, onLike }) {
    return (
        <div className={styles.actions}>
            <div className={cx('avatar')}>
                <img src={avatar} alt="Avatar" />
            </div>
            <button className={cx('heartButton')} onClick={onHeart}>
                ❤️ {hearts}
            </button>
            <button className={cx('likeButton')} onClick={onLike}>
                ⭐ {likes}
            </button>
            <button className={cx('commentButton')}>💬 {comments}</button>
            <button className={cx('shareButton')}>🔗 {shares}</button>
        </div>
    );
}

export default VideoActions;
