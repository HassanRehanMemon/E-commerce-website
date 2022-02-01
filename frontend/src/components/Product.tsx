import React from 'react';

interface product  {
    name: string,
    image : string,
    description : string,
    brand: string,
    category: string,
    price : number,
    countInStock : number,
    rating : number,
    numReviews : number,
}

interface Props{
    product: product
}
const Product: React.FC<Props> = ({product}) => {
    console.log(product)
  return (<div> {product.name}</div>);
};

export default Product;

