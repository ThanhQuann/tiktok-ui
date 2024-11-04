import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import styles from './HomeLayout.module.scss';
import classNames from 'classnames/bind';
import videos from '~/components/Videos/videos';
import { Link } from 'react-router-dom';
import { FaVolumeUpIcon, FaVolumeMuteIcon, EllipsisIcon, FloatingIcon } from '~/components/Icons';
import ActionItem from './actionItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Home() {
    const [, setPlayingIndex] = useState(null);
    const videoRefs = useRef([]);
    const [volumes, setVolumes] = useState(videos.map(() => 1));
    const [muted, setMuted] = useState(videos.map(() => false));
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isHoveredVolumeIcon, setHoveredVolumeIcon] = useState(null);
    const [currentTimes, setCurrentTimes] = useState(videos.map(() => 0));
    const [durations, setDurations] = useState(videos.map(() => 0));
    const [isPlaying, setIsPlaying] = useState(false);
    const [showIcon, setShowIcon] = useState(false);

    // const [actionStates, setActionStates] = useState(() => {
    //     const storedStates = JSON.parse(localStorage.getItem('actionStates'));
    //     return (
    //         storedStates ||
    //         videos.map(() => ({
    //             isHeartActive: false,
    //             isLikeActive: false,
    //             isSubmitted: false,
    //         }))
    //     );
    // });

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
                    setIsPlaying(!isPlaying);
                    setShowIcon(true);
                    setTimeout(() => setShowIcon(false), 500);
                }
            });
        },
        [isPlaying],
    );

    const toggleMute = useCallback((index) => {
        setMuted((prevMuted) => {
            const newMuted = [...prevMuted];
            newMuted[index] = !newMuted[index];
            if (videoRefs.current[index]) {
                videoRefs.current[index].muted = newMuted[index];
            }
            return newMuted;
        });
    }, []);

    const handleVolumeChange = useCallback((index, value) => {
        setVolumes((prevVolumes) => {
            const newVolumes = [...prevVolumes];
            newVolumes[index] = value;
            if (videoRefs.current[index]) {
                videoRefs.current[index].volume = value;
            }
            return newVolumes;
        });
    }, []);

    const handleSeekChange = useCallback((index, value) => {
        if (videoRefs.current[index]) {
            videoRefs.current[index].currentTime = value;
            setCurrentTimes((prevTimes) => {
                const newTimes = [...prevTimes];
                newTimes[index] = value;
                return newTimes;
            });
        }
    }, []);

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

        return () => {
            videoElements.forEach((video, index) => {
                if (video) {
                    video.removeEventListener('timeupdate', () => updateTimeAndDuration(index));
                    video.removeEventListener('loadedmetadata', () => updateTimeAndDuration(index));
                }
            });
        };
    }, []);

    const handleMouseEnterVideo = (event, index) => {
        if (event.target.tagName === 'VIDEO') {
            setHoveredIndex(index);
        }
    };

    const handleMouseLeaveVideo = (event) => {
        if (event.target.tagName === 'VIDEO') {
            setHoveredIndex(null);
        }
    };

    // const handleHeartClick = (index) => {
    //     setActionStates((prevStates) => {
    //         const newStates = [...prevStates];
    //         newStates[index].isHeartActive = !newStates[index].isHeartActive;
    //         localStorage.setItem('actionStates', JSON.stringify(newStates));
    //         return newStates;
    //     });
    // };

    // const handleLikeClick = (index) => {
    //     setActionStates((prevStates) => {
    //         const newStates = [...prevStates];
    //         newStates[index].isLikeActive = !newStates[index].isLikeActive;
    //         localStorage.setItem('actionStates', JSON.stringify(newStates));
    //         return newStates;
    //     });
    // };
    // const handleSubmitClick = (index) => {
    //     setActionStates((prevStates) => {
    //         const newStates = [...prevStates];
    //         newStates[index].isSubmitted = !newStates[index].isSubmitted;
    //         localStorage.setItem('actionStates', JSON.stringify(newStates));
    //         return newStates;
    //     });
    // };
    const renderedVideos = useMemo(
        () =>
            videos.map((video, index) => (
                <div
                    key={index}
                    className={cx('video-container')}
                    onMouseEnter={(e) => handleMouseEnterVideo(e, index)}
                    onMouseLeave={(e) => handleMouseLeaveVideo(e)}
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
                            key={video.id}
                            avatars={video.avatars}
                            hearts={video.hearts}
                            comments={video.comments}
                            likes={video.likes}
                            videoId={video.id}
                            shares={video.shares}
                            // isHeartActive={actionStates[index].isHeartActive}
                            // isLikeActive={actionStates[index].isLikeActive}
                            // isSubmitted={actionStates[index].isSubmitted}
                            // onHeartClick={() => handleHeartClick(index)}
                            // onLikeClick={() => handleLikeClick(index)}
                            // onSubmitClick={() => handleSubmitClick(index)}
                        />
                    </div>
                    {showIcon && (
                        <div className={cx('icon-overlay', { show: showIcon })}>
                            <FontAwesomeIcon className={cx('icon-play')} icon={isPlaying ? faPause : faPlay} />
                        </div>
                    )}
                    <div className={cx('progress-controls')}>
                        <input
                            type="range"
                            min="0"
                            max={durations[index]}
                            step="0.1"
                            value={currentTimes[index]}
                            onChange={(e) => handleSeekChange(index, e.target.value)}
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
                                        onMouseEnter={() => setHoveredVolumeIcon(index)}
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
                                onMouseEnter={() => setHoveredVolumeIcon(index)}
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
                                    style={{ transform: 'rotate(360deg)' }}
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
            isHoveredVolumeIcon,
            isPlaying,
            showIcon,
            // actionStates,
        ],
    );

    return (
        <div className={cx('video-wrapper')}>
            <div className={cx('video-container--home')}> {renderedVideos} </div>
        </div>
    );
}

export default Home;
