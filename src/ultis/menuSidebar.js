import icons from './icon'

const { 
    RiCompassDiscoverLine, 
    HiTrendingUp, 
    MdLibraryMusic, 
    MdPlayCircleOutline, 
    PiMusicNotesPlus,
    AiOutlineStar,
    BsMenuButtonWide,
    LuHistory,
    MdFavoriteBorder,
    BiSolidPlaylist,
    CgAlbum,
    FiUpload,
} = icons

export const menuSidebar = [
    {
        path: '',
        text: 'Khám Phá',
        icon: <RiCompassDiscoverLine size={25}/>
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icon: <HiTrendingUp size={24}/>,
        play: <MdPlayCircleOutline size={20}/>,
    },
    {
        path: 'library',
        text: 'Thư Viện',
        icon: <MdLibraryMusic size={24}/>,
        play: <MdPlayCircleOutline size={20}/>,
    },
]

export const menuSidebarRank = [
    {
        path: 'moi-phat-hanh',
        text: 'BXH Nhạc Mới',
        icon: <PiMusicNotesPlus size={23}/>,
        play: <MdPlayCircleOutline size={20}/>,
    },
    {
        path: 'hub',
        text: 'Chủ Đề & Thể Loại',
        icon: <BsMenuButtonWide size={21}/>,
    },
    {
        path: 'top100',
        text: 'Top 100',
        icon: <AiOutlineStar size={24}/>
    }
]

export const menuSidebarMymusic = [
    {
        path: 'mymusic/hitory',
        text: 'Nghe gần đây',
        icon: <LuHistory size={24}/>,
    },
    {
        path: 'mymusic/favorite',
        text: 'Bài hát yêu thích',
        icon: <MdFavoriteBorder size={24}/>,
        play: <MdPlayCircleOutline size={20}/>,
    },
    {
        path: 'mymusic/playlist',
        text: 'Playlist',
        icon: <BiSolidPlaylist size={24}/>,
    },
    {
        path: 'mymusic/album',
        text: 'Album',
        icon: <CgAlbum size={24}/>,
    },
    {
        path: 'mymusic/upload',
        text: 'Đã tải lên',
        icon: <FiUpload size={24}/>,
    },
]
