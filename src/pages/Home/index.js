import { useRef, useState, useCallback, useMemo } from 'react';
import styles from './HomeLayout.module.scss';
import classNames from 'classnames/bind';
import videos from '~/components/Videos/videos';
import { Link } from 'react-router-dom';
import { FaVolumeUpIcon, FaVolumeMuteIcon } from '~/components/Icons';
const cx = classNames.bind(styles);
function Home() {
    const [, setPlayingIndex] = useState(null); // Trạng thái video đang phát
    const videoRefs = useRef([]);
    const [volumes, setVolumes] = useState(videos.map(() => 1));
    const [muted, setMuted] = useState(videos.map(() => false));
    const hoveredIndex = useRef(null);
    // Hàm xử lý khi người dùng click vào video để phát hoặc tạm dừng
    const handleVideoClick = useCallback(
        (index) => {
            videoRefs.current.forEach((video, i) => {
                if (video) {
                    if (i === index) {
                        if (video.paused) {
                            video.play();
                            setPlayingIndex(index);
                        } else {
                            video.pause();
                            setPlayingIndex(null);
                        }
                    } else {
                        video.pause();
                    }
                }
            });
        },
        [], // Dependency rỗng vì không cần phụ thuộc vào trạng thái khác
    );

    // Hàm chuyển đổi tắt/bật tiếng của video
    const toggleMute = useCallback(
        (index) => {
            setMuted((prevMuted) => {
                const newMuted = [...prevMuted];
                newMuted[index] = !newMuted[index];
                if (videoRefs.current[index]) {
                    videoRefs.current[index].muted = newMuted[index];
                }
                return newMuted;
            });
        },
        [], // Không cần phụ thuộc vào các giá trị khác
    );

    // Hàm xử lý thay đổi âm lượng
    const handleVolumeChange = useCallback(
        (index, value) => {
            setVolumes((prevVolumes) => {
                const newVolumes = [...prevVolumes];
                newVolumes[index] = value;
                if (videoRefs.current[index]) {
                    videoRefs.current[index].volume = value;
                }
                return newVolumes;
            });
        },
        [], // Không cần phụ thuộc vào các giá trị khác
    );
    const handleMouseEnter = useCallback((index) => {
        hoveredIndex.current = index;
        // Không cần re-render, chỉ thay đổi giá trị ref
    }, []);

    const handleMouseLeave = useCallback(() => {
        hoveredIndex.current = null;
        // Không cần re-render, chỉ thay đổi giá trị ref
    }, []);
    // Render các video và thông tin video
    const renderedVideos = useMemo(
        () =>
            videos.map((video, index) => (
                <div
                    key={index}
                    className={cx('video-container')}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                >
                    <video
                        className={cx('video-home')}
                        loop
                        onClick={() => handleVideoClick(index)}
                        ref={(el) => (videoRefs.current[index] = el)}
                    >
                        <source src={video.src} type="video/mp4" />
                    </video>
                    <div className={cx('video-info')}>
                        <Link>
                            <h3 className={cx('video-author')}>{video.author}</h3>
                        </Link>
                        <h1 className={cx('video-desc')}>{video.desc}</h1>
                        <p className={cx('video-music')}>{video.music}</p>
                    </div>
                    <div className={cx('volume-controls')}>
                        {hoveredIndex.current === index && (
                            <button onClick={() => toggleMute(index)} className={cx('mute-button')}>
                                {muted[index] ? (
                                    <FaVolumeMuteIcon className={cx('active-mute')} />
                                ) : (
                                    <FaVolumeUpIcon className={cx('active-volume')} />
                                )}
                            </button>
                        )}

                        {
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volumes[index]}
                                onChange={(e) => handleVolumeChange(index, e.target.value)}
                                className={cx('volume-slider')}
                                style={{ transform: 'rotate(360deg)' }} // Xoay thanh âm lượng
                            />
                        }
                    </div>
                </div>
            )),

        [
            muted,
            volumes,
            handleVideoClick,
            toggleMute,
            handleVolumeChange,
            hoveredIndex,
            handleMouseEnter,
            handleMouseLeave,
        ], // Cập nhật khi những giá trị này thay đổi
    );
    return <div className={cx('video-wrapper')}>{renderedVideos}</div>;
}

export default Home;
