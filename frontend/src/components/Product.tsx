import React from 'react';
import { Card} from 'react-bootstrap'

interface product {
    name: string,
    image: string,
    description?: string,
    brand: string,
    category: string,
    price: number,
    countInStock: number,
    rating?: number,
    numReviews?: number,
}

interface Props {
    product: product
}
const Product: React.FC<Props> = ({ product }) => {
    console.log(product)
    return (
        <Card className="my-3 py-3 rounded">
            <Card.Img variant="top" src={product.image}/>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.rating}</Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;

