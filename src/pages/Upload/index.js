import { FileIcon, ImageIcon, ResolutionIcon, SnipImgIcon, UploadVideoIcon } from '~/components/Icons';
import styles from './Upload.module.scss';
import classNames from 'classnames/bind';
import { useRef } from 'react';

const cx = classNames.bind(styles);
function Upload() {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (events) => {
        const file = events.target.files[0];
        if (file) {
            console.log('File name:', file.name);
            console.log('File type:', file.type);
            console.log('File size:', file.size);
            console.log('File ID (last modified):', file.lastModified);
        }
    };

    return (
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
                            accept="video/*,image/*"
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
    );
}

export default Upload;
