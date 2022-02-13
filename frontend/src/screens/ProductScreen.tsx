import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Image, ListGroup, Card, Alert, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listDetailProduct } from '../actions/productAction';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import { State } from '../reducers';
import {  useNavigate } from 'react-router-dom'

const ProductScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    console.log(qty)
    const dispatch = useDispatch()
    const { product, error, loading } = useSelector((state: State) => state.productDetail)

    useEffect(() => {
        dispatch(listDetailProduct(id))


    }, [dispatch, id])
    

    const addToCartHandler = () =>{
        navigate(`/cart/${id}?qty=${qty}`)
    }
    return (
        <div>
            <Link to='/' className="btn btn-dark my-3">Go Back</Link>
            {
                loading
                    ? <Loader />
                    : error !== ""
                        ?
                        <Alert variant='danger'>{error}</Alert>
                        :
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} fluid />
                            </Col>
                            <Col md={3}  >
                                <ListGroup variant="flush">
                                    <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                                    <ListGroup.Item><Rating rating={product.rating} text={`${product.numReviews} reviews`} /></ListGroup.Item>
                                    <ListGroup.Item>Price ${parseFloat(product.price).toFixed(2)}</ListGroup.Item>
                                    <ListGroup.Item>{product.description}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>

                                <ListGroup variant="flush">
                                    <Card>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price: </Col>
                                                <Col>${(Number(product.price) * qty).toFixed(2)}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status: </Col>
                                                <Col>{product.countInStock > 0 ? 'In-stock' : 'Out of stock'}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {
                                            product.countInStock > 0 &&
                                            <ListGroup.Item>
                                                <Row >
                                                    <Col>Quantity:</Col>
                                                    <Col>
                                                        <Form.Control
                                                            as='select'
                                                            value={qty}
                                                            onChange={(e) => setQty(Number(e.target.value))}
                                                        >
                                                            {[...Array(product.countInStock).keys()].map(
                                                                (x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                )
                                                            )}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        }
                                        <ListGroup.Item>
                                            <Button
                                                className="btn-block"
                                                disabled={product.countInStock === 0}
                                                onClick={addToCartHandler}
                                            >
                                                Add to Cart
                                            </Button>
                                        </ListGroup.Item>

                                    </Card>
                                </ListGroup>
                            </Col>
                        </Row>
            }
        </div>
    );
};

export default ProductScreen;
