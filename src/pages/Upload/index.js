import { FileIcon, ImageIcon, ResolutionIcon, SnipImgIcon, UploadVideoIcon } from '~/components/Icons';
import styles from './Upload.module.scss';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import Content from './Content';

const cx = classNames.bind(styles);
function Upload() {
    const fileInputRef = useRef(null);
    const [showContent, setShowContent] = useState(false);
    const [videoInfo, setVideoInfo] = useState('null'); // Trạng thái lưu thông tin video

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setShowContent(true);
            const videoName = file.name;
            const videoDurationInSeconds = Math.floor(file.size / (1024 * 1024)); // Giả định 1MB ~ 1 giây
            const minutes = Math.floor(videoDurationInSeconds / 60);
            const seconds = videoDurationInSeconds % 60;
            const formattedDuration = `${minutes}m ${seconds}s`;
            const videoSizeInMB = (file.size / (1024 * 1024)).toFixed(1);

            setVideoInfo({
                name: videoName,
                duration: formattedDuration,
                size: `${videoSizeInMB} MB`,
            });
        }
    };
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <div>
            {!showContent ? (
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div onClick={handleButtonClick} className={cx('container-upload')}>
                            <UploadVideoIcon className={cx('icon')} />
                            <div className={cx('upload')}>Select video to upload</div>
                            <div className={cx('text')}>Or drag and drop it here</div>
                            <div className={cx('upload-video')}>
                                <button className={cx('btn-upload')}>
                                    <div className={cx('title-upload')}>Select video</div>
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    accept="video/*"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('icon-size')}>
                        <div className={cx('suggest-item')}>
                            <div className={cx('image-sgt')}>
                                <ImageIcon />
                            </div>
                            <div className={cx('text-content')}>
                                <p className={cx('title')}>Size and duration</p>
                                <p className={cx('desc')}>Maximum size: 10 GB, video duration: 60 minutes.</p>
                            </div>
                        </div>
                        <div className={cx('suggest-item')}>
                            <div className={cx('image-sgt')}>
                                <FileIcon />
                            </div>
                            <div className={cx('text-content')}>
                                <p className={cx('title')}>File formats</p>
                                <p className={cx('desc')}>Recommended: “.mp4”. Other major formats are supported.</p>
                            </div>
                        </div>
                        <div className={cx('suggest-item')}>
                            <div className={cx('image-sgt')}>
                                <ResolutionIcon />
                            </div>
                            <div className={cx('text-content')}>
                                <p className={cx('title')}>Video resolutions</p>
                                <p className={cx('desc')}>Minimum resolution: 720p. 2K and 4K are supported..</p>
                            </div>
                        </div>
                        <div className={cx('suggest-item')}>
                            <div className={cx('image-sgt')}>
                                {' '}
                                <SnipImgIcon />
                            </div>
                            <div className={cx('text-content')}>
                                <p className={cx('title')}>Aspect ratios</p>
                                <p className={cx('desc')}>Recommended: 16:9 for landscape, 9:16 for vertical.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Content activeVideo={videoInfo} />
            )}
        </div>
    );
}

export default Upload;
