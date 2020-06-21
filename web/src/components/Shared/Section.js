import React from 'react';

const Separator = ({title, subtitle, id}) => {
  return (
    <div className="py-16 flex flex-col items-center" id={id}>
      <p className="mb-3 text-2xl font-semibold">{ title }</p>
      <div style={{ 'height': '2px' }} className="mb-3 w-12 bg-gray-400"></div>
      { subtitle ? <p className="max-w-screen-md text-center text-gray-600">{ subtitle }</p> : null }
    </div>
  );
};

export default Separator;
