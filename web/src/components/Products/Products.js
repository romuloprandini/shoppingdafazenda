import React from 'react';
import ProductsPanelItem from './ProductPanelItem';

const Products = ({ products, clasName = "flex flex-col grid gap-0 sm:gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ml-auto sm:w-10/12 mr-auto" }) => {
  return (
      <div className={clasName}>
        { products.map(product => <ProductsPanelItem key={product.id} product={product} />)}
    </div>
  );
};

export default Products;
