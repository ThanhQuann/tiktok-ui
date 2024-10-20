import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import styles from './HomeLayout.module.scss';
import classNames from 'classnames/bind';
import videos from '~/components/Videos/videos';
import { Link } from 'react-router-dom';
import { FaVolumeUpIcon, FaVolumeMuteIcon, EllipsisIcon, FloatingIcon } from '~/components/Icons';
import ActionItem from './actionItem';

const cx = classNames.bind(styles);

function Home() {
    const [, setPlayingIndex] = useState(null); // Trạng thái video đang phát
    const videoRefs = useRef([]); // Lưu tham chiếu đến các video
    const [volumes, setVolumes] = useState(videos.map(() => 1));
    const [muted, setMuted] = useState(videos.map(() => false));
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isHoveredVolumeIcon, setHoveredVolumeIcon] = useState(null);
    // Trạng thái hover
    const [currentTimes, setCurrentTimes] = useState(videos.map(() => 0)); // Thời gian hiện tại của mỗi video
    const [durations, setDurations] = useState(videos.map(() => 0)); // Thời lượng của mỗi video

    // Hàm xử lý khi click vào video
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
        [], // Không cần phụ thuộc vào các giá trị khác
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
    // Hàm xử lý thay đổi tiến trình video
    const handleSeekChange = useCallback(
        (index, value) => {
            if (videoRefs.current[index]) {
                videoRefs.current[index].currentTime = value;
                setCurrentTimes((prevTimes) => {
                    const newTimes = [...prevTimes];
                    newTimes[index] = value;
                    return newTimes;
                });
            }
        },
        [], // Không cần phụ thuộc vào các giá trị khác
    );

    // Cập nhật thời gian hiện tại và thời lượng của video khi phát
    useEffect(() => {
        const videoElements = videoRefs.current;

        const updateTimeAndDuration = (index) => {
            if (videoElements[index]) {
                const video = videoElements[index];
                setCurrentTimes((prevTimes) => {
                    const newTimes = [...prevTimes];
                    newTimes[index] = video.currentTime;
                    return newTimes;
                });
                setDurations((prevDurations) => {
                    const newDurations = [...prevDurations];
                    newDurations[index] = video.duration;
                    return newDurations;
                });
            }
        };

        videoElements.forEach((video, index) => {
            if (video) {
                video.addEventListener('timeupdate', () => updateTimeAndDuration(index));
                video.addEventListener('loadedmetadata', () => updateTimeAndDuration(index));
            }
        });

        // Cleanup sự kiện khi component unmount
        return () => {
            videoElements.forEach((video, index) => {
                if (video) {
                    video.removeEventListener('timeupdate', () => updateTimeAndDuration(index));
                    video.removeEventListener('loadedmetadata', () => updateTimeAndDuration(index));
                }
            });
        };
    }, []); // Empty dependency array để chạy effect một lần khi mount

    // Cập nhật trạng thái hover khi người dùng di chuột vào/ra
    const handleMouseEnterVideo = useCallback((index) => {
        setHoveredIndex(index);
    }, []);

    const handleMouseLeaveVideo = useCallback(() => {
        setHoveredIndex(null);
    }, []);
    // Render các video và thông tin video
    const renderedVideos = useMemo(
        () =>
            videos.map((video, index) => (
                <div
                    key={index}
                    onMouseEnter={() => handleMouseEnterVideo(index)}
                    onMouseLeave={handleMouseLeaveVideo}
                    className={cx('video-container')}
                >
                    <div style={{ display: 'flex' }}>
                        <video
                            className={cx('video-home')}
                            loop
                            onClick={() => handleVideoClick(index)}
                            ref={(el) => (videoRefs.current[index] = el)}
                        >
                            <source src={video.src} type="video/mp4" />
                        </video>
                        <ActionItem
                            // ref={forwardRef}
                            key={video.id}
                            avatars={video.avatars}
                            hearts={video.hearts}
                            comments={video.comments}
                            likes={video.likes}
                            shares={video.shares}
                        />
                    </div>

                    <div className={cx('progress-controls')}>
                        <input
                            type="range"
                            min="0"
                            max={durations[index]} // Tổng thời lượng video
                            step="0.1"
                            value={currentTimes[index]} // Thời gian hiện tại
                            onChange={(e) => handleSeekChange(index, e.target.value)} // Gọi khi người dùng kéo để tua video
                            className={cx('progress-bar')}
                        />
                    </div>
                    <div>
                        {(hoveredIndex === index || muted[index]) && (
                            <div>
                                <div className={cx('volume-controls')}>
                                    <button
                                        onClick={() => toggleMute(index)}
                                        className={cx('volume-icon')}
                                        onMouseEnter={() => {
                                            setHoveredVolumeIcon(index);
                                        }}
                                        onMouseLeave={() => setHoveredVolumeIcon(null)}
                                    >
                                        {muted[index] ? <FaVolumeMuteIcon /> : <FaVolumeUpIcon />}
                                    </button>
                                </div>
                                <div className={cx('media-control__top')} onClick={() => handleVideoClick(index)}></div>
                                <EllipsisIcon className={cx('control-ellipsis')} />
                                <FloatingIcon className={cx('control-floating')} />
                            </div>
                        )}

                        {!muted[index] && isHoveredVolumeIcon === index && (
                            <div
                                className={cx('Control-Volume__container')}
                                onMouseEnter={() => {
                                    setHoveredVolumeIcon(index);
                                }}
                                onMouseLeave={() => setHoveredVolumeIcon(null)}
                            >
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
                            </div>
                        )}
                    </div>
                    <div className={cx('video-info')}>
                        <Link>
                            <h3 className={cx('video-author')}>{video.author}</h3>
                        </Link>
                        <h1 className={cx('video-desc')}>{video.desc}</h1>
                        <p className={cx('video-music')}>{video.music}</p>
                    </div>
                </div>
            )),
        [
            muted,
            volumes,
            currentTimes,
            durations,
            handleVideoClick,
            toggleMute,
            handleVolumeChange,
            handleSeekChange,
            hoveredIndex,
            handleMouseEnterVideo,
            handleMouseLeaveVideo,
            isHoveredVolumeIcon,
        ],
    );
    return (
        <div className={cx('video-wrapper')}>
            <div className={cx('video-container--home')}> {renderedVideos}</div>
        </div>
    );
}

export default Home;
