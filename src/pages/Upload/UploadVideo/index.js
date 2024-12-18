import { useState, useRef, useEffect } from 'react';
import styles from './Content.module.scss';
import classNames from 'classnames/bind';
import {
    CheckIcon,
    DropdownIcon,
    DropdownsmallIcon,
    InfoIcon,
    LoadIcon,
    LocationIcon,
    NoneImgIcon,
    TooltipIcon,
    UploadVideoIcon,
} from '~/components/Icons';
import axios from 'axios';
const cx = classNames.bind(styles);

function Content({ activeVideo, videoUrl, coverImg, fileStart }) {
    const [text, setText] = useState('');
    const [hidden, setHidden] = useState('true');
    const [selectedOption, setSelectedOption] = useState('Everyone');
    const [click, setClick] = useState(false);
    const [videoInfo, setVideoInfo] = useState(activeVideo);
    const [videoURL, setVideoURL] = useState(videoUrl);
    const [coverImage, setCoverImage] = useState(coverImg);
    const [isModal, setIsModal] = useState(false);
    const [file, setFile] = useState(fileStart); // Thêm state file

    const fileInputRef = useRef(null);
    const videoRef = useRef();
    const maxText = 4000;
    const handlePlayVideo = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };
    const handleTextChange = (e) => {
        const inputText = e.target.value;
        setText(inputText.length > maxText ? inputText.slice(0, maxText) : inputText);
    };

    const handleClick = () => {
        setClick(!click);
    };
    const handClickHidden = () => {
        setHidden(!hidden);
    };
    const handleActionClick = (option) => {
        setSelectedOption(option);
        setClick(false);
    };
    useEffect(() => {
        const handleScroll = (event) => {
            if (isModal) {
                event.preventDefault();
            }
        };
        if (isModal) {
            window.addEventListener('wheel', handleScroll, { passive: false });
        }

        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [isModal]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideoInfo(null);
            setVideoURL(null);
            const videoName = file.name;
            const videoDurationInSeconds = Math.floor(file.size / (1024 * 1024));
            const minutes = Math.floor(videoDurationInSeconds / 60);
            const seconds = videoDurationInSeconds % 60;
            const formattedDuration = `${minutes}m ${seconds}s`;
            const videoSizeInMB = (file.size / (1024 * 1024)).toFixed(1);
            setVideoInfo({
                name: videoName,
                duration: formattedDuration,
                size: `${videoSizeInMB} MB`,
            });
            setHidden(true);
            setVideoURL(null);

            const url = URL.createObjectURL(file);
            setVideoURL(url);

            // Khởi tạo videoElement để xử lý ảnh bìa
            const videoElement = document.createElement('video');
            videoElement.src = url;

            videoElement.onloadeddata = () => {
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                const imageUrl = canvas.toDataURL('image/png'); // Chuyển thành URL ảnh
                setCoverImage(imageUrl); // Lưu URL ảnh vào coverImage
                URL.revokeObjectURL(url); // Giải phóng bộ nhớ
            };

            videoElement.load();
            setFile(file);
        } else {
            console.log('Không phải là file video hợp lệ');
        }
    };

    // const fetchVideos = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3005/tiktokstudio/upload'); // Thay đổi URL này theo API của bạn
    //         return response.data; // Giả sử API trả về danh sách video
    //     } catch (error) {
    //         console.error('Lỗi khi tải video:', error);
    //         return [];
    //     }
    // };
    const handlePostData = async () => {
        const formData = new FormData();
        if (text.trim() === '') {
            alert('Vui lòng nhập mô tả video');
            setIsModal(false);
            return;
        }
        formData.append('file', file);
        formData.append('text', text); // Đảm bảo tên trùng khớp với backend
        formData.append(
            'avatars',
            'https://media.ngoisao.vn/resize_580/news/2012/6/17/49/e201216209315414fd54a8a5aa14jpg1339897831.jpg',
        );
        setIsModal(false);
        formData.forEach((value, key) => {
            console.log(key, value);
        });
        try {
            await axios.post('http://localhost:3005/tiktokstudio/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsModal(false); // Đóng modal sau khi gửi video thành công
        } catch (error) {
            if (error.response) {
                console.error('Lỗi khi đăng video:', error.response.data); // Log lỗi chi tiết
            } else {
                console.error('Lỗi khi đăng video:', error.message);
            }
        }
    };

    const handleActiveModel = () => {
        setIsModal(true);
    };
    useEffect(() => {
        if (!hidden && fileInputRef.current) {
            fileInputRef.current.click();
            setCoverImage('');
        }
    }, [hidden]);
    useEffect(() => {
        if (videoUrl) {
            setVideoURL(videoUrl);
        }
        if (coverImg) {
            setCoverImage(coverImg);
        }
        if (fileStart) {
            setFile(fileStart);
        }
    }, [videoUrl, coverImg, fileStart]);
    return (
        <div className={cx('wrapper-header')}>
            <div className={cx('wrapper-header-upload')}>
                {videoInfo && hidden ? (
                    <div className={cx('video-info')}>
                        <div className={cx('video-header')}>
                            <span className={cx('video-name')}> {videoInfo.name}</span>
                            <div onClick={handClickHidden} className={cx('video-replace')}>
                                <div className={cx('video-load')}>
                                    <LoadIcon />
                                    <span className={cx('video-title')}>Replace</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('detail')}>
                            <span className={cx('detail-info')}>
                                Size: <span className={cx('detail-desc')}>{videoInfo.size}</span>
                            </span>
                            <span className={cx('detail-info')}>
                                Duration: <span className={cx('detail-desc')}>{videoInfo.duration}</span>
                            </span>
                        </div>
                        <div className={cx('finish')}>
                            <InfoIcon />
                            <span className={cx('finish-upload')}>Uploaded</span>
                            <div className={cx('finish-progress')}>100%</div>
                        </div>
                    </div>
                ) : (
                    <div onClick={() => fileInputRef.current.click()} className={cx('header_upload')}>
                        <UploadVideoIcon className={cx('icon')} />
                        <div>
                            <div className={cx('upload')}>Select video to upload</div>
                            <div className={cx('text')}>Or drag and drop it here</div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            accept="video/*"
                        />
                    </div>
                )}
            </div>
            <div className={cx('wrapper-description')}>
                <div className={cx('Description-video')}>
                    <div className={cx('content-reverse')}>
                        <span className={cx('content-description')}>Description</span>
                        <div className={cx('content-text')}>
                            <textarea
                                className={cx('input-text')}
                                value={text}
                                onChange={handleTextChange}
                                placeholder="Share more about your video here..."
                            />
                            <div className={cx('caption')}>
                                <div className={cx('char-count')}>
                                    {text.length}/{maxText}
                                </div>
                                <div className={cx('caption-text')}>
                                    <div className={cx('caption-tag')}># Hashtag</div>
                                    <div className={cx('caption-tag')}>@ Mention</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('clip')}>
                        <span className={cx('Cover')}>Cover</span>
                        <TooltipIcon />
                    </div>

                    <div className={cx('custom-img')}>
                        {coverImage ? (
                            <img className={cx('img-cover')} src={coverImage} alt="" />
                        ) : (
                            <NoneImgIcon className={cx('None-img')} />
                        )}
                    </div>
                    <div className={cx('location')}>
                        <div className={cx('location-title')}>
                            <span className={cx('location-text')}>Location</span>
                            <TooltipIcon />
                        </div>
                        <div className={cx('location-search')}>
                            <LocationIcon />
                            <input className={cx('input-search')} type="text" placeholder="Search locations" />
                        </div>
                        <div className={cx('location-suggest-item')}>
                            <div className={cx('item-location')}>Thành Phố Hồ Chí Minh</div>
                            <div className={cx('item-location')}>Thành Phố Hà Nội</div>
                            <div className={cx('item-location')}>Thành Phố Đà Nẵng</div>
                            <div className={cx('item-location')}>Trạm dừng chân phúc lộc thọ cái bè tiền giang</div>
                        </div>
                    </div>

                    <div className={cx('watch')}>
                        <span className={cx('watch-video')}>Who can watch this video</span>
                        <div className={cx('select-button')}>
                            <div onClick={handleClick} className={cx('custom-button')}>
                                <button className={cx('button-action')}>{selectedOption}</button>
                                <DropdownsmallIcon className={cx('dropdown')} />
                            </div>
                            <ul className={cx('menu', { active: click })}>
                                <li onClick={() => handleActionClick('Everyone')} className={cx('menu-option')}>
                                    Everyone
                                    {selectedOption === 'Everyone' && <CheckIcon className={cx('check')} />}
                                </li>
                                <li onClick={() => handleActionClick('Friends')} className={cx('menu-option')}>
                                    Friends
                                    {selectedOption === 'Friends' && <CheckIcon className={cx('check')} />}
                                </li>
                                <li onClick={() => handleActionClick('Only you')} className={cx('menu-option')}>
                                    Only you
                                    {selectedOption === 'Only you' && <CheckIcon className={cx('check')} />}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('post')}>
                        <span className={cx('post-text')}>When to post</span>
                        <div className={cx('post-item')}>
                            <div className={cx('post-time')}>
                                <input type="radio" name="option" className={cx('post-input')} />
                                <label className={cx('post-desc')}>Now</label>
                            </div>
                            <div className={cx('post-time')}>
                                <input type="radio" name="option" className={cx('post-input')} />
                                <label className={cx('post-desc')}>Schedule</label>
                                <TooltipIcon className={cx('post-icon')} />
                            </div>
                        </div>
                    </div>
                    {isModal && (
                        <div className={cx('modal-overlay')}>
                            <div className={cx('modal-confirm')}>
                                <div className={cx('modal-confirm__text')}>
                                    <div className={cx('modal-confirm__title')}>Your video has been uploaded</div>
                                    <div className={cx('modal-confirm__desc')}>
                                        You can manage your posts or upload another video.
                                    </div>
                                    <div className={cx('flex-action')}>
                                        <div className={cx('action-manage')}>
                                            <button className={cx('btn-manage')}>Manage posts</button>
                                        </div>
                                        <div className={cx('action-upload')}>
                                            <button onClick={handlePostData} className={cx('btn-upload')}>
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={cx('switch-copy')}>
                        <span className={cx('copy-check')}>Run a copyright check</span>
                        <TooltipIcon className={cx('icon-switch')} />
                        <label className={cx('toggle-switch')}>
                            <input type="checkbox" />
                            <span className={cx('slider')}></span>
                        </label>
                    </div>
                    <div className={cx('Seemore')}>
                        <span className={cx('Seemore-title')}>See more</span>
                        <DropdownIcon />
                    </div>
                    <span className={cx('Seemore-desc')}>Content disclosure and other advanced settings</span>
                    <div className={cx('line-height')}></div>

                    <div className={cx('action')}>
                        <button className={cx('upload-btn')} onClick={handleActiveModel}>
                            Post
                        </button>
                        <button className={cx('discard-btn')}>Discard</button>
                    </div>
                </div>
                <div className={cx('preview-video')}>
                    {hidden && (
                        <video onClick={handlePlayVideo} className={cx('video')} src={videoURL} ref={videoRef} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Content;
