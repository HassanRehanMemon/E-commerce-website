import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Image, ListGroup, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listDetailProduct } from '../actions/productAction';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import { product } from '../interfaces';
import { State } from '../reducers';

const ProductScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const {product, error, loading} = useSelector((state: State) => state.productDetail)
    // const [product, setProduct] = useState<product>();

    useEffect(() => {
        // axios.get(`/api/products/${id}`).then(({ data }) => {
        //     console.log(data)
        //     setProduct(data)
        //     // setProduct({...data, 'countInStock':0})
        // })
        dispatch(listDetailProduct(id))


    }, [])
    return (
        <div>
            <Link to='/' className="btn btn-dark my-3">Go Back</Link>
            {
                loading
                    ? <Loader />
                    :
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} fluid />
                        </Col>
                        <Col md={3}  >
                            <ListGroup variant="flush">
                                <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                                <ListGroup.Item><Rating rating={product.rating} text={`${product.numReviews} reviews`} /></ListGroup.Item>
                                <ListGroup.Item>Price ${product.price}</ListGroup.Item>
                                <ListGroup.Item>{product.description}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>

                            <ListGroup variant="flush">
                                <Card>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price: </Col>
                                            <Col>${product.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status: </Col>
                                            <Col>{product.countInStock > 0 ? 'In-stock' : 'Out of stock'}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item><Button className="btn-block" disabled={product.countInStock ===0}>Add to Cart</Button></ListGroup.Item>

                                </Card>
                            </ListGroup>
                        </Col>
                    </Row>
            }
        </div>
    );
};

export default ProductScreen;
