const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3005;

// Cấu hình CORS cho phép frontend từ localhost:3000 hoặc port khác
app.use(cors({ origin: ['http://localhost:3000'], methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
// Đổi lại port nếu frontend ở port khác

// Middleware để xử lý dữ liệu JSON
app.use(express.json());
let videos = [];

// Kiểm tra nếu thư mục 'uploads' chưa tồn tại, tạo thư mục
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Cấu hình Multer để lưu video vào thư mục 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Chỉ định thư mục lưu video
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên file dựa trên thời gian
    },
});
// const uploadVideo = 'uploadvideos';
// if (!fs.existsSync(uploadVideo)) {
//     fs.mkdirSync(uploadVideo);
// }
const videosFilePath = 'videos.json';
if (fs.existsSync(videosFilePath)) {
    const fileData = fs.readFileSync(videosFilePath, 'utf-8');
    videos = JSON.parse(fileData);
}
// Giới hạn kích thước tệp và kiểm tra loại tệp (chỉ cho phép video)
const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // Giới hạn tệp tối đa 100MB
    fileFilter: (req, file, cb) => {
        const filetypes = /mp4|mov|avi|mkv/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only video files are allowed.'));
        }
    },
});

// Xử lý lỗi Multer
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Lỗi từ Multer (ví dụ: quá kích thước tệp)
        return res.status(400).json({ error: err.message });
    } else if (err) {
        // Lỗi khác
        return res.status(400).json({ error: err.message });
    }
    next();
});

// API POST để upload video và lưu thông tin video
// Cho phép truy cập vào file trong thư mục 'uploads' như file tĩnh
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API để lấy danh sách các video đã upload
app.get('/tiktokstudio/upload', (req, res) => {
    const files = fs.readdirSync(uploadDir); // Đọc danh sách file trong thư mục 'uploads'
    res.json(files); // Trả về danh sách các tên file
});
app.get('/', (req, res) => {
    res.send('Hello, this is the backend server!');
});

app.post('/tiktokstudio/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const { text, avatars } = req.body;

    if (!text) {
        return res.status(400).send('Text missing');
    }

    // Tạo thông tin video mới
    const videoInfo = {
        id: videos.length + 1, // Tạo ID dựa trên số lượng video hiện tại
        file: req.file.filename, // Lấy tên file từ req.file
        author: 'minhnguyetam',
        music: 'Nhạc nền - gốc',
        text: text || '',
        avatars: avatars || '',
        hearts: 0,
        comments: 0,
        likes: 0,
        shares: 0,
        isSubmitted: false,
        isLikeActive: false,
        isHeartActive: false,
        url: `http://localhost:3005/uploads/${req.file.filename}`, // Đường dẫn đến video
    };

    // Thêm video vào mảng videos
    videos.push(videoInfo);
    fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2), 'utf-8');

    // Trả về thông tin video mới
    res.status(200).json({
        message: 'Video uploaded successfully',
        video: videoInfo,
    });
});
videos = videos.filter((video) => Object.keys(video).length !== 0);

// API để lấy danh sách các video đã upload với thông tin chi tiết
app.get('/tiktokstudio/videos', (req, res) => {
    const videos = getVideosFromFile();
    res.json(videos);
});
app.put('/tiktokstudio/videos/:id', (req, res) => {
    const videoId = req.params.id; // Lấy ID từ URL
    const updatedData = req.body; // Dữ liệu bạn muốn cập nhật

    const videoIndex = videos.findIndex((video) => video.id === parseInt(videoId));
    if (videoIndex === -1) {
        return res.status(404).json({ message: 'Video not found' });
    }

    // Cập nhật video
    videos[videoIndex] = { ...videos[videoIndex], ...updatedData };
    // Lưu lại vào file videos.json

    fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2), 'utf-8');

    res.status(200).json(videos[videoIndex]);
});

app.get('/tiktokstudio/videos/:id', (req, res) => {
    const videoId = parseInt(req.params.id); // Lấy ID từ URL
    const video = videos.find((v) => v.id === videoId); // Tìm video trong mảng 'videos' theo ID

    if (!video) {
        return res.status(404).json({ error: 'Video not found' }); // Nếu không tìm thấy video, trả về lỗi
    }

    res.json(video); // Trả về video tìm thấy
});

const getVideosFromFile = () => {
    try {
        const data = fs.readFileSync(videosFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading videos.json:', error);
        return [];
    }
};
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
