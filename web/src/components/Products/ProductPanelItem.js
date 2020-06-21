import React from 'react';

const ProductsPanelItem = ({product}) => {
  return product ? (
    <div className="sm:mx-5 sm:w-64 overflow-hidden flex items-center flex-col product-panel">
      <img className="sm:w-48 sm:h-48 sm:rounded-full my-8 object-cover" src={product.image} alt={product.title} />
      <div className="lg:px-6 lg:py-4 text-center">
        <div className="font-bold text-xl mb-2">{ product.title }</div>
        <p className="text-gray-700 text-sm">
        { product.description }
        </p>
      </div>
    </div>
  ) : null;
};

export default ProductsPanelItem;
