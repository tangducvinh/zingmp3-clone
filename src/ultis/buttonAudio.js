import icons from './icon'

const { 
    AiOutlineHeart, 
    AiFillHeart, 
    SlOptions,
    IoPlaySkipBackSharp,
    IoPlaySkipForwardSharp,
    BsPlayCircle,
    FaRandom,
    RiRepeatFill,
    MdMusicVideo,
    PiMicrophoneStage,
    BiWindows,
    HiOutlineSpeakerWave,
    HiOutlineSpeakerXMark,
    BiSolidPlaylist,
} = icons

export const inforBtn = {
    loveBtn: {
        icon: <AiOutlineHeart />,
        content: 'Thêm vào thư viện',
    },
    addBtn: {
        icon: <SlOptions />,
        content: 'Xem Thêm',
    }
}

export const controlBtn = {
    random: {
        icon: <FaRandom size={20} />,
        content: 'Bật phát ngẫu nhiên',
    },
    back: {
        icon: <IoPlaySkipBackSharp size={20} />,
    },
    play: {
        icon: <BsPlayCircle size={40}/>,
    },
    next: {
        icon: <IoPlaySkipForwardSharp size={20} />,
    },
    repeat: {
        icon: <RiRepeatFill size={20} />,
        content: 'Bật phát lại tất cả',
    }
}

export const option = {
    mv: {
        icon: <MdMusicVideo size={20} />,
    },
    lyric: {
        icon: <PiMicrophoneStage size={16}/>,
        content: 'Xem lời bài hát'
    },
    windown: {
        icon: <BiWindows size={16}/>,
        content: 'Chế độ cửa sổ',
    },
    speaker: {
        icon: <HiOutlineSpeakerWave size={16}/>
        // HiOutlineSpeakerXMark
    },
    list: {
        icon: <BiSolidPlaylist size={17}/>,
    }
}

