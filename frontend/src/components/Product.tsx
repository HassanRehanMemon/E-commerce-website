import React from 'react';
import { Card } from 'react-bootstrap'
import Rating from './Rating';
import { Link } from 'react-router-dom'

interface product {
    _id: any
    name: string,
    image: string,
    description?: string,
    brand: string,
    category: string,
    price: number,
    countInStock: number,
    rating: number,
    numReviews?: number,
}

interface Props {
    product: product
}
const Product: React.FC<Props> = ({ product }) => {
    console.log(product)
    return (
        <Card className="my-3 py-3 rounded">

            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Card.Text>
                    <Rating rating={product.rating} text={`${product.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;

