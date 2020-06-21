
import React from 'react';

const SliderImage = ({img, style, className = 'w-full h-full object-cover bg-black overflow-hidden'}) => {
  return img ? (
    <img key={img.id} src={img.src} alt={img.caption ? img.caption : 'Silder Image'} 
         className={className} style={style}/>
  ) : null;
}

export default SliderImage;

