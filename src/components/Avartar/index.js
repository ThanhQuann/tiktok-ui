export const Avatar = ({ width = '4,8rem', height = '4,8rem', className, src, alt }) => (
    <img className={className} width={width} height={height} loading="" alt={alt} src={src} />
);

export const avatars = [
    {
        src: 'https://randomuser.me/api/portraits/men/1.jpg',
        alt: 'Avatar 1',
    },
    {
        src: 'https://randomuser.me/api/portraits/women/1.jpg',
        alt: 'Avatar 2',
    },
    {
        src: 'https://randomuser.me/api/portraits/men/2.jpg',
        alt: 'Avatar 3',
    },
    {
        src: 'https://randomuser.me/api/portraits/women/2.jpg',
        alt: 'Avatar 4',
    },
    {
        src: 'https://randomuser.me/api/portraits/men/3.jpg',
        alt: 'Avatar 5',
    },
    {
        src: 'https://randomuser.me/api/portraits/women/3.jpg',
        alt: 'Avatar 6',
    },
    {
        src: 'https://randomuser.me/api/portraits/men/4.jpg',
        alt: 'Avatar 7',
    },
    {
        src: 'https://randomuser.me/api/portraits/women/4.jpg',
        alt: 'Avatar 8',
    },
    {
        src: 'https://randomuser.me/api/portraits/men/5.jpg',
        alt: 'Avatar 9',
    },
    {
        src: 'https://randomuser.me/api/portraits/women/5.jpg',
        alt: 'Avatar 10',
    },
];

export const AvatarList = () => (
    <div>
        {avatars.map((avatar, index) => (
            <Avatar key={index} className="ImgAvatar" src={avatar.src} alt={avatar.alt} />
        ))}
    </div>
);
