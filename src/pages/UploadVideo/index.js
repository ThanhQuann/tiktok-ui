// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

function ApiClient() {
//     const [videoData, setVideoData] = useState(null);

//     // Hàm gọi API để lấy dữ liệu video dưới dạng JSON
//     const fetchVideoData = async () => {
//         try {
//             const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3005';
//             const response = await axios.get(`${API_URL}/tiktokstudio/upload`);
//             setVideoData(response.data); // Lưu dữ liệu JSON vào state
//             console.log('hihi')
//         } catch (error) {
//             console.error('Lỗi khi lấy dữ liệu video:', error);
//             alert('Đã xảy ra lỗi khi lấy dữ liệu video');
//         }
//     };

//     // Dùng useEffect để gọi API ngay khi component được mount
//     useEffect(() => {
//         fetchVideoData();
//     }, []);

//     return (
//         <div>
//             <h1>Dữ liệu Video từ API</h1>
//             <pre>{JSON.stringify(videoData, null, 2)}</pre>
//         </div>
//     );
}

export default ApiClient;
