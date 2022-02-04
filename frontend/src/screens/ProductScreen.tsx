import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Image, ListGroup } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import { product } from '../interfaces';

const ProductScreen = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<product>();

    useEffect(() => {
        axios.get(`/api/products/${id}`).then(({ data }) => {
            console.log(data)
            setProduct(data)
        })

    }, [])
    return (
        <div>
            <Link to='/' className="btn btn-dark my-3">Go Back</Link>
            {
                product === undefined
                    ? <Loader />
                    :
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} fluid />
                        </Col>
                        <Col md={3}  >
                            <ListGroup variant="flush">
                                <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                                <ListGroup.Item><Rating rating={product.rating} text={`${product.numReviews} reviews`}  /></ListGroup.Item>
                                <ListGroup.Item>Price ${product.price}</ListGroup.Item>
                                <ListGroup.Item>{product.description}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
            }
            <h3>{id}</h3>
        </div>
    );
};

export default ProductScreen;
