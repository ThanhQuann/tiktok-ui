
// Hàm để định dạng số lớn hơn 1000
const formatNumber = (number) => {
    return number > 999999
        ? parseFloat((number / 1000000).toFixed(1)) + 'M'
        : number > 9999
        ? parseFloat((number / 1000).toFixed(1)) + 'K'
        : number;
};

const videos = [
    {
        id: 1,
        src: require('~/videos/video1.mp4'),
        author: 'legiang',
        desc: 'Một ngày đẹp trời bên cạnh những người bạn thân thiết.',
        music: 'Nhạc nền - hongloan19930',
        avatars: {
            src: 'https://randomuser.me/api/portraits/men/1.jpg',
            alt: 'Avatar 1',
        },
        hearts: formatNumber(1234567),
        comments: formatNumber(209989),
        likes: formatNumber(500000),
        shares: formatNumber(367894),
    },
    {
        id: 2,
        src: require('~/videos/video2.mp4'),
        author: 'thanhquan',
        desc: 'Khám phá vẻ đẹp của thiên nhiên trong từng khung hình.',
        music: 'Nhạc nền - nhacxua',
        avatars: {
            src: 'https://randomuser.me/api/portraits/women/1.jpg',
            alt: 'Avatar 2',
        },
        hearts: formatNumber(118089),
        comments: formatNumber(103589),
        likes: formatNumber(162090),
        shares: formatNumber(102565),
    },
    {
        id: 3,
        src: require('~/videos/video3.mp4'),
        author: 'giangdethuong',
        desc: 'Những khoảnh khắc tuyệt vời bên gia đình.',
        music: 'Nhạc nền - yeuthuong',
        avatars: {
            src: 'https://randomuser.me/api/portraits/men/2.jpg',
            alt: 'Avatar 3',
        },
        hearts: formatNumber(90234),
        comments: formatNumber(12345),
        likes: formatNumber(323042),
        shares: formatNumber(15111),
    },
    {
        id: 4,
        src: require('~/videos/video4.mp4'),
        author: 'giangxinhdep',
        desc: 'Bước nhảy tuyệt đẹp của những vũ công chuyên nghiệp.',
        music: 'Nhạc nền - dapchunhieu',
        avatars: {
            src: 'https://randomuser.me/api/portraits/women/2.jpg',
            alt: 'Avatar 4',
        },
        hearts: formatNumber(13203),
        comments: formatNumber(10181),
        likes: formatNumber(14341),
        shares: formatNumber(12223),
    },
    {
        id: 5,
        src: require('~/videos/video5.mp4'),
        author: 'giangvuto',
        desc: 'Chia sẻ những bí quyết nấu ăn đơn giản và ngon.',
        music: 'Nhạc nền - amthuc',
        avatars: {
            src: 'https://randomuser.me/api/portraits/men/3.jpg',
            alt: 'Avatar 5',
        },
        hearts: formatNumber(1300),
        comments: formatNumber(1050),
        likes: formatNumber(17000),
        shares: formatNumber(1100),
    },
    {
        id: 6,
        src: require('~/videos/video6.mp4'),
        author: 'giangkute',
        desc: 'Đi dạo trên bãi biển trong ánh hoàng hôn.',
        music: 'Nhạc nền - thiennhien',
        avatars: {
            src: 'https://randomuser.me/api/portraits/women/3.jpg',
            alt: 'Avatar 6',
        },
        hearts: formatNumber(1200),
        comments: formatNumber(1030),
        likes: formatNumber(1450),
        shares: formatNumber(1000),
    },
    {
        id: 7,
        src: require('~/videos/video7.mp4'),
        author: 'giangngucto',
        desc: 'Chuyến phiêu lưu khám phá các địa điểm thú vị.',
        music: 'Nhạc nền - phieuluu',
        avatars: {
            src: 'https://randomuser.me/api/portraits/men/4.jpg',
            alt: 'Avatar 7',
        },
        hearts: formatNumber(1250),
        comments: formatNumber(1040),
        likes: formatNumber(1550),
        shares: formatNumber(1035),
    },
    {
        id: 8,
        src: require('~/videos/video8.mp4'),
        author: 'nguyendinh',
        desc: 'Những câu chuyện thú vị từ cuộc sống hàng ngày.',
        music: 'Nhạc nền - cuocsong',
        avatars: {
            src: 'https://randomuser.me/api/portraits/women/4.jpg',
            alt: 'Avatar 8',
        },
        hearts: formatNumber(80),
        comments: formatNumber(10),
        likes: formatNumber(310),
        shares: formatNumber(20),
    },
    {
        id: 9,
        src: require('~/videos/video9.mp4'),
        author: 'minhha',
        desc: 'Hành trình đi bộ đường dài và ngắm nhìn cảnh đẹp.',
        music: 'Nhạc nền - duongda',
        avatars: {
            src: 'https://randomuser.me/api/portraits/men/5.jpg',
            alt: 'Avatar 9',
        },
        hearts: formatNumber(1175),
        comments: formatNumber(1025),
        likes: formatNumber(1520),
        shares: formatNumber(1032),
    },
    {
        id: 10,
        src: require('~/videos/video10.mp4'),
        author: 'tuananh',
        desc: 'Chia sẻ các mẹo trang trí nhà cửa độc đáo.',
        music: 'Nhạc nền - trangtri',
        avatars: {
            src: 'https://randomuser.me/api/portraits/women/5.jpg',
            alt: 'Avatar 10',
        },
        hearts: formatNumber(1220),
        comments: formatNumber(1028),
        likes: formatNumber(1660),
        shares: formatNumber(1045),
    },
];

export default videos;
