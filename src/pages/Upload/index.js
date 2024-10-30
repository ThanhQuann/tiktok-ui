import {
    CheckIcon,
    DropdownIcon,
    DropdownsmallIcon,
    FileIcon,
    ImageIcon,
    LocationIcon,
    ResolutionIcon,
    SnipImgIcon,
    TooltipIcon,
    UploadVideoIcon,
} from '~/components/Icons';
import styles from './Upload.module.scss';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { type } from '@testing-library/user-event/dist/type';

const cx = classNames.bind(styles);
function Upload() {
    const [text, setText] = useState('');
    const [selectedOption, setlectedOption] = useState('Everyone');
    const [click, setClick] = useState(false);
    const maxText = 4000;
    const handleChangText = (e) => {
        const inputText = e.target.value;
        if (inputText.length > maxText) {
            setText(inputText.slice(0, maxText));
        } else {
            setText(inputText);
        }
    };
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('File name:', file.name);
            console.log('File type:', file.type);
            console.log('File size:', file.size);
            console.log('File ID (last modified):', file.lastModified);
        }
    };
    const handleClick = () => {
        setClick(!click);
    };
    const handleActionClick = (option) => {
        setlectedOption(option);
        setClick(false);
    };
    return (
        // <div className={cx('wrapper')}>
        //     <div className={cx('container')}>
        //         <div onClick={handleButtonClick} className={cx('container-upload')}>
        //             <UploadVideoIcon className={cx('icon')} />
        //             <div className={cx('upload')}>Select video to upload</div>
        //             <div className={cx('text')}>Or drag and drop it here</div>
        //             <div className={cx('upload-video')}>
        //                 <button className={cx('btn-upload')}>
        //                     <div className={cx('title-upload')}>Select video</div>
        //                 </button>
        //                 <input
        //                     type="file"
        //                     ref={fileInputRef}
        //                     style={{ display: 'none' }}
        //                     onChange={handleFileChange}
        //                     accept="video/*,image/*"
        //                 />
        //             </div>
        //         </div>
        //     </div>
        //     <div className={cx('icon-size')}>
        //         <div className={cx('suggest-item')}>
        //             <div className={cx('image-sgt')}>
        //                 <ImageIcon />
        //             </div>
        //             <div className={cx('text-content')}>
        //                 <p className={cx('title')}>Size and duration</p>
        //                 <p className={cx('desc')}>Maximum size: 10 GB, video duration: 60 minutes.</p>
        //             </div>
        //         </div>
        //         <div className={cx('suggest-item')}>
        //             <div className={cx('image-sgt')}>
        //                 <FileIcon />
        //             </div>
        //             <div className={cx('text-content')}>
        //                 <p className={cx('title')}>File formats</p>
        //                 <p className={cx('desc')}>Recommended: “.mp4”. Other major formats are supported.</p>
        //             </div>
        //         </div>
        //         <div className={cx('suggest-item')}>
        //             <div className={cx('image-sgt')}>
        //                 <ResolutionIcon />
        //             </div>
        //             <div className={cx('text-content')}>
        //                 <p className={cx('title')}>Video resolutions</p>
        //                 <p className={cx('desc')}>Minimum resolution: 720p. 2K and 4K are supported..</p>
        //             </div>
        //         </div>
        //         <div className={cx('suggest-item')}>
        //             <div className={cx('image-sgt')}>
        //                 {' '}
        //                 <SnipImgIcon />
        //             </div>
        //             <div className={cx('text-content')}>
        //                 <p className={cx('title')}>Aspect ratios</p>
        //                 <p className={cx('desc')}>Recommended: 16:9 for landscape, 9:16 for vertical.</p>
        //             </div>
        //         </div>
        //     </div>

        // </div>
        <div className={cx('wrapper-header')}>
            <div className={cx('wrapper-header-upload')}>
                <div onClick={handleButtonClick} className={cx('header_upload')}>
                    <div className={cx('header_upload-upload')}>
                        <UploadVideoIcon className={cx('icon')} />
                        <div>
                            <div className={cx('upload')}>Select video to upload</div>
                            <div className={cx('text')}>Or drag and drop it here</div>
                        </div>
                        <div className={cx('upload-video')}>
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
            </div>
            <div className={cx('Description-video')}>
                <div className={cx('content-reverse')}>
                    <span className={cx('content-description')}>Description</span>
                    <div className={cx('content-text')}>
                        <textarea
                            className={cx('input-text')}
                            value={text}
                            onChange={handleChangText}
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
                    <div className={cx('edit-video')}></div>
                </div>
                <div className={cx('video-preview')}>
                    <span className={cx('video-text')}> Cover </span>
                    <TooltipIcon />
                </div>
                <img src="" alt="" className={cx('img-cover')} />
                <div className={cx('location')}>
                    <div className={cx('location-title')}>
                        <span className={cx('location-text')}> Location </span>
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
                        <div className={cx('item-location')}>Trạm dừng chân phúc lộc thọ cái bè tiền giang </div>
                        <div className={cx('item-location')}>Nơi nào đó anh sẽ lấy em làm vợ</div>
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
                                {selectedOption === 'Friends' && <CheckIcon className={cx('check')} />}{' '}
                            </li>
                            <li onClick={() => handleActionClick('Only you')} className={cx('menu-option')}>
                                Only you
                                {selectedOption === 'Only you' && <CheckIcon className={cx('check')} />}{' '}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('post')}>
                    <span className={cx('post-text')}> When to post </span>
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
                <div className={cx('switch-copy')}>
                    <span className={cx('copy-check')}>Run a copyright check</span>
                    <TooltipIcon className={cx('icon-switch')} />
                    <label className={cx('toggle-switch')}>
                        <input type="checkbox" />
                        <span className={cx('slider')}></span>
                    </label>
                </div>
                <div className={cx('Seemore')}>
                    <span className={cx('Seemore')}>See more</span>
                    <DropdownIcon />
                </div>
                <span className={cx('title-seemore')}>Content disclosure and other advanced settings</span>
                <div className={cx('line-height ')}></div>
                <div className={cx('action')}>
                    <button className={cx('upload-btn')}>Post</button>
                    <button className={cx('discard-btn')}>Discard</button>
                </div>
            </div>
        </div>
    );
}

export default Upload;
