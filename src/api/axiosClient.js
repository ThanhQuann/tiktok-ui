// import axios from 'axios';

// const uploadVideo = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file); // 'file' phải trùng với field name trong multer

//     try {
//         const response = await axios.post('http://localhost:3000/tiktokstudio/upload', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         console.log('Video uploaded successfully:', response.data);
//     } catch (error) {
//         console.error('Error uploading video:', error);
//     }
// };
