const videos = [
    {
        id: 1,
        src: require('~/videos/video1.mp4'),
        author: 'VTV24',
        desc: 'Thương quá Quảng Bình ơi...',
        music: 'Nhạc nền - VTV Âm thanh gốc',
        avatars: {
            src: 'https://randomuser.me/api/portraits/men/1.jpg',
            alt: 'Avatar 1',
        },
        hearts: 1234567,
        comments: 209989,
        likes: 500000,
        shares: 367894
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
        hearts: 118089,
        comments: 103589,
        likes: 162090,
        shares: 102565,
    },
    // {
    //     id: 3,
    //     src: require('~/videos/video3.mp4'),
    //     author: 'giangz',
    //     desc: 'Những khoảnh khắc tuyệt vời bên gia đình.',
    //     music: 'Nhạc nền - yeuthuong',
    //     avatars: {
    //         src: 'https://randomuser.me/api/portraits/men/2.jpg',
    //         alt: 'Avatar 3',
    //     },
    //     hearts: 90234,
    //     comments: 12345,
    //     likes: 323042,
    //     shares: 15111,
    // },
    // {
    //     id: 4,
    //     src: require('~/videos/video4.mp4'),
    //     author: 'genz',
    //     desc: 'Bước nhảy tuyệt đẹp của những vũ công chuyên nghiệp.',
    //     music: 'Nhạc nền - dapchunhieu',
    //     avatars: {
    //         src: 'https://randomuser.me/api/portraits/women/2.jpg',
    //         alt: 'Avatar 4',
    //     },
    //     hearts: 13203,
    //     comments: 10181,
    //     likes: 14341,
    //     shares: 12223,
    // },
    // {
    //     id: 5,
    //     src: require('~/videos/video5.mp4'),
    //     author: 'geng',
    //     desc: 'Chia sẻ những bí quyết nấu ăn đơn giản và ngon.',
    //     music: 'Nhạc nền - amthuc',
    //     avatars: {
    //         src: 'https://randomuser.me/api/portraits/men/3.jpg',
    //         alt: 'Avatar 5',
    //     },
    //     hearts: 1300,
    //     comments: 1050,
    //     likes: 17000,
    //     shares: 1100,
    // },
    // {
    //     id: 6,
    //     src: require('~/videos/video6.mp4'),
    //     author: 'nhanmay',
    //     desc: 'Đi dạo trên bãi biển trong ánh hoàng hôn.',
    //     music: 'Nhạc nền - thiennhien',
    //     avatars: {
    //         src: 'https://randomuser.me/api/portraits/women/3.jpg',
    //         alt: 'Avatar 6',
    //     },
    //     hearts: 1200,
    //     comments: 1030,
    //     likes: 1450,
    //     shares: 1000,
    // },
    // {
    //     id: 7,
    //     src: require('~/videos/video7.mp4'),
    //     author: 'lethuy',
    //     desc: 'Chuyến phiêu lưu khám phá các địa điểm thú vị.',
    //     music: 'Nhạc nền - phieuluu',
    //     avatars: {
    //         src: 'https://randomuser.me/api/portraits/men/4.jpg',
    //         alt: 'Avatar 7',
    //     },
    //     hearts: 1250,
    //     comments: 1040,
    //     likes: 1550,
    //     shares: 1035,
    // },
    // {
    //     id: 8,
    //     src: require('~/videos/video8.mp4'),
    //     author: 'nguyendinh',
    //     desc: 'Những câu chuyện thú vị từ cuộc sống hàng ngày.',
    //     music: 'Nhạc nền - cuocsong',
    //     avatars: {
    //         src: 'https://randomuser.me/api/portraits/women/4.jpg',
    //         alt: 'Avatar 8',
    //     },
    //     hearts: 80,
    //     comments: 10,
    //     likes: 310,
    //     shares: 20,
    // },
    // {
    //     id: 9,
    //     src: require('~/videos/video9.mp4'),
    //     author: 'minhha',
    //     desc: 'Hành trình đi bộ đường dài và ngắm nhìn cảnh đẹp.',
    //     music: 'Nhạc nền - duongda',
    //     avatars: {
    //         src: 'https://randomuser.me/api/portraits/men/5.jpg',
    //         alt: 'Avatar 9',
    //     },
    //     hearts: 1175,
    //     comments: 1025,
    //     likes: 1520,
    //     shares: 1032,
    // },
    // {
    //     id: 10,
    //     src: require('~/videos/video10.mp4'),
    //     author: 'tuananh',
    //     desc: 'Chia sẻ các mẹo trang trí nhà cửa độc đáo.',
    //     music: 'Nhạc nền - trangtri',
    //     avatars: {
    //         src: 'https://randomuser.me/api/portraits/women/5.jpg',
    //         alt: 'Avatar 10',
    //     },
    //     hearts: 1220,
    //     comments: 1028,
    //     likes: 1660,
    //     shares: 1045,
    // },
    // {
    //     id: 11,
    //     src: require('~/videos/video11.mp4'),
    //     author: 'nhana',
    //     desc: 'Chia sẻ các mẹo trang trí nhà cửa độc đáo.',
    //     music: 'Nhạc nền - trangtri',
    //     avatars: {
    //         src: 'https://randomuser.me/api/portraits/women/4.jpg',
    //         alt: 'Avatar 11',
    //     },
    //     hearts: 80,
    //     comments: 10,
    //     likes: 310,
    //     shares: 20,
    // },
];

export default videos;
