import React from 'react'

import BackArrow from '../Shared/BackArrow';
import NextArrow from '../Shared/NextArrow';

export default function FullScreenImage({ image, show, onClose, onPrevImage, onNextImage }) {
    return show ? (
        <div className="fixed w-full h-full-70px top-70px left-0 z-20 bg-black overflow-auto">
            <div className="relative flex flex-row items-center justify-center w-full h-full m-auto pt-12 max-w-screen-xl">
                <BackArrow onClick={onPrevImage} />
                {image ? <img className="w-screen h-full object-contain" src={image.src} alt={image.caption}/> : null}
                <NextArrow onClick={onNextImage} />
            </div>
            <span className="text-white absolute top-10px right-25px text-4xl font-bold cursor-pointer hover:text-gray-300" onClick={ onClose }>&times;</span>
        </div>
    ) : null;
}
