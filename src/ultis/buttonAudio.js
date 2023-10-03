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
    BsPauseCircle,
    IoShuffle,
    TbRepeatOnce,
} = icons

export const inforBtn = {
    loveBtnOutline: {
        icon: <AiOutlineHeart />,
        content: 'Thêm vào thư viện',
    },
    loveBtnFill: {
        icon: <AiFillHeart />,
        content: 'Xoá khỏi thư viện',
        color: true,
    },
    addBtn: {
        icon: <SlOptions />,
        content: 'Xem Thêm',
    },
    addBtnAlbum: {
        icon: <SlOptions />,
        content: 'Khác',
    }
}

export const controlBtn = {
    random: {
        icon: <IoShuffle size={24} />,
        content: 'Bật phát ngẫu nhiên',
    },
    randomOn: {
        icon: <IoShuffle size={24} />,
        content: 'Tắt phát ngẫu nhiên',
    },
    back: {
        icon: <IoPlaySkipBackSharp size={20} />,
    },
    play: {
        iconPlay: <BsPlayCircle size={40}/>,
        iconPause: <BsPauseCircle size={40}/>
    },
    next: {
        icon: <IoPlaySkipForwardSharp size={20} />,
    },
    repeat: {
        icon: <RiRepeatFill size={20} />,
        content: 'Bật phát lại tất cả',
    },
    repeatOn: {
        icon: <RiRepeatFill size={20} />,
        content: 'Bật phát lại một bài'
    },
    repeatOnly: {
        icon: <TbRepeatOnce size={24} />,
        content: 'Tắt phát lại'
    }
}

export const option = {
    mv: {
        icon: <MdMusicVideo size={18} />,
    },
    lyric: {
        icon: <PiMicrophoneStage size={17}/>,
        content: 'Xem lời bài hát'
    },
    windown: {
        icon: <BiWindows size={18}/>,
        content: 'Chế độ cửa sổ',
    },
    speaker: {
        icon: <HiOutlineSpeakerWave size={19}/>
    },
    noSpeaker: {
        icon: <HiOutlineSpeakerXMark size={19}/>
    },
    list: {
        icon: <BiSolidPlaylist size={17}/>,
    }
}


